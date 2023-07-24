import '@styles/main.scss';
// import 'react-modern-drawer/dist/index.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'rsuite/dist/rsuite.css';
import 'cropperjs/dist/cropper.css';
// import '@uppy/core/dist/style.min.css';
// import '@uppy/dashboard/dist/style.min.css';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCookie } from 'cookies-next';
import { wrapper } from '@store/redux';
// import { MyDrawer } from '@components/drawer';
import { MyProvider } from '@components/Provider';
import { TabModule } from '@utils/storage';
import { initTab } from '@actions/tab/tab.action';
import { MyLoading } from '@components/loading';
import { updateGnb } from '@actions/gnb/gnb.action';
import { ASIDE_MENU } from '@constants/gnb';
import { initialzeBackendAxios } from '@utils/axios/backend';
import hrsService from '@services/hrsService';
import { updatePermission } from '@actions/hr/set-permission.action';

function MyApp({ Component, pageProps }: AppProps) {
    const { events, asPath } = useRouter();

    const dispatch = useDispatch();
    // 라우팅 시 탭 및 GNB 갱신
    useEffect(() => {
        // 탭 처리
        const tab = new TabModule();

        dispatch(initTab(tab.getAll()));
        // GNB 처리
        const [_, gnb] = asPath.split('/');

        if (!['login', 'board'].some((d) => d === gnb)) {
            dispatch(updateGnb(ASIDE_MENU[gnb]));
        }

        function onRouteChange(url: string) {
            tab.initialize();

            dispatch(initTab(tab.getAll()));
        }

        events.on('routeChangeComplete', onRouteChange);

        return () => {
            events.off('routeChangeComplete', onRouteChange);
        };
    }, [events, asPath, dispatch]);

    return (
        <MyProvider>
            <Component {...pageProps} />

            {/* <MyDrawer /> */}
            <MyLoading />
        </MyProvider>
    );
}

MyApp.getInitialProps = wrapper.getInitialAppProps(
    ({ dispatch }) =>
        async ({ Component, ctx, router }) => {
            const { req, res } = ctx;
            // 서버에서만 실행
            if (req && res) {
                const token = getCookie(process.env.COOKIE_TOKEN_KEY || '', {
                    req,
                    res,
                });
                // axios 초기화
                initialzeBackendAxios(token);
                // permission 제외 페이지
                const excludePermissionPages = ['/', '/login', '/404'];
                // permission
                if (!excludePermissionPages.includes(router.route)) {
                    try {
                        const { data } = await hrsService.getPermission({
                            division: 'system',
                        });
                        const { user_info } = data;
                        // 특정 권한 정보가 있는 경우
                        if (user_info) {
                            dispatch(updatePermission(data));
                        }
                    } catch {}
                }
            }

            let pageProps = {};
            if (Component.getInitialProps) {
                pageProps = await Component.getInitialProps(ctx);
            }

            return { pageProps };
        },
);

export default wrapper.withRedux(MyApp);
