import '@styles/main.scss';
// import 'react-modern-drawer/dist/index.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'rsuite/dist/rsuite.css';
import 'cropperjs/dist/cropper.css';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { wrapper } from '@store/redux';
// import { MyDrawer } from '@components/drawer';
import { MyProvider } from '@components/Provider';
import { MyLoading } from '@components/loading';
import { updateGnb } from '@actions/gnb/gnb.action';
import { ASIDE_MENU } from '@constants/gnb';
import { TabModule } from '@utils/storage';
import { initTab } from '@actions/tab/tab.action';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    const dispatch = useDispatch();

    // 라우팅 시 탭 및 GNB 갱신
    useEffect(() => {
        onRouteChange();

        // 탭 활성화
        function initializeTab(url: string) {
            const [_, gnb, ...lnbs] = url.split('/');

            let target = ASIDE_MENU[gnb];
            for (let i = 0; i < lnbs.length; i++) {
                target = target[lnbs[i]];
            }

            // 상세페이지인 경우 제외
            if (!target) {
                return;
            }

            const tab = new TabModule();

            if (!tab.read(url)) {
                tab.create({
                    id: url,
                    label: target.label,
                    to: url,
                });
            }

            dispatch(initTab(tab.getAll()));
        }

        function onRouteChange(url?: string) {
            // 404, 500 페이지 제한
            if (
                [
                    '/404',
                    '/500',
                    '/test',
                    '/select-upload',
                    '/etc/shop_list',
                    '/calculate',
                ].includes(router.route)
            ) {
                const tab = new TabModule();

                dispatch(initTab(tab.getAll()));
            } else {
                const [_, gnb] = router.asPath.split('/');

                // 탭 추가 제한 페이지
                if (gnb !== 'login') {
                    initializeTab(router.pathname);
                    // gnb 추가 제한 페이지
                    if (!['board', 'calendar'].includes(gnb)) {
                        dispatch(updateGnb(ASIDE_MENU[gnb]));
                    }
                }
            }
        }

        // const handleKeyPress = (event: KeyboardEvent) => {
        //     // 전역 키보드 이벤트 처리
        //     if (event.ctrlKey && (event.key === 'f' || event.key === 'F')) {
        //         // Ctrl + F를 눌렀을 때 기본 동작 중지
        //         event.preventDefault();

        //         // 여기서 원하는 동작을 추가
        //         alert(
        //             'Ctrl + F가 눌렸습니다. 사용자 정의 동작을 수행할 수 있습니다.',
        //         );
        //     }
        // };

        // window.addEventListener('keydown', handleKeyPress);
        // events.on('routeChangeComplete', onRouteChange);
        return () => {
            // window.removeEventListener('keydown', handleKeyPress);
            // events.off('routeChangeComplete', onRouteChange);
        };
    }, [router]);

    return (
        <MyProvider>
            <Component {...pageProps} />

            {/* <MyDrawer /> */}
            <MyLoading />
        </MyProvider>
    );
}

export default wrapper.withRedux(MyApp);
