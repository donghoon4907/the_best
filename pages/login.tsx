import type { NextPage } from 'next';
import type { FormEvent } from 'react';
import Head from 'next/head';
import { FaUser, FaKey, FaPowerOff, FaHeadset } from 'react-icons/fa';
import { MyCheckbox } from '@components/checkbox';
import { useApi } from '@hooks/use-api';
import { loginRequest } from '@actions/user/login.action';
import { useRouter } from 'next/router';
import { useInput } from '@hooks/use-input';

const Login: NextPage = () => {
    const displayName = 'wr-pages-login';

    const router = useRouter();

    const login = useApi(loginRequest);

    const userid = useInput('');

    const password = useInput('');

    const handleSubmit = (evt: FormEvent) => {
        evt.preventDefault();

        login({ userid: userid.value, password: password.value }, () => {
            router.push('/long/list');
        });
    };

    return (
        <>
            <Head>
                <title>우리인슈맨라이프 - 로그인</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
            </Head>
            <div className={`${displayName}__wrap`}>
                <div className={`${displayName}`}>
                    <div className={`${displayName}__left`}>
                        <img
                            src="/static/images/main.png"
                            alt="Wooriinsumanlife"
                        />
                    </div>
                    <div className={`${displayName}__right`}>
                        <div className={`${displayName}__header`}>
                            <div className={`${displayName}__secret`}>
                                대외비
                            </div>
                        </div>
                        <form
                            className={`${displayName}__body`}
                            onSubmit={handleSubmit}
                        >
                            <div className="wr-login-input__wrap">
                                <div className="wr-login-input__icon">
                                    <FaUser size={30} />
                                </div>
                                <input
                                    type="text"
                                    className="wr-login-input"
                                    placeholder="사원번호"
                                    {...userid}
                                    required
                                />
                            </div>
                            <div className="wr-login-input__wrap">
                                <div className="wr-login-input__icon">
                                    <FaKey size={30} />
                                </div>
                                <input
                                    type="password"
                                    className="wr-login-input"
                                    placeholder="Password"
                                    {...password}
                                    required
                                />
                            </div>
                            <div className="wr-login-btn__wrap">
                                <button type="submit" className="wr-login-btn">
                                    로그인
                                </button>
                                <div className="wr-login-btn__icon">
                                    <FaPowerOff size={25} />
                                </div>
                            </div>
                        </form>
                        <div className={`${displayName}__services`}>
                            <div>
                                <MyCheckbox
                                    id="saveId"
                                    label="사원번호 또는 ID 저장"
                                />
                            </div>
                            <div className={`${displayName}__expand`}>
                                <a href="#" className={`${displayName}__reset`}>
                                    비밀번호 초기화
                                </a>
                            </div>
                        </div>
                        <div className={`${displayName}__phone`}>
                            <div>
                                <FaHeadset size={25} />
                            </div>
                            <div>Help Desk 070-4881-6003</div>
                        </div>
                        <div className={`${displayName}__footer`}>
                            <span>
                                우리인슈맨라이프 사용자를 위한 시스템으로
                                인가된분만 사용가능합니다.
                            </span>
                            <br />
                            <span>
                                Copyrightⓒ by Wooriinsumanlife Co., Ltd. All
                                rights reserved
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
