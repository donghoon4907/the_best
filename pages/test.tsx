import type { NextPage } from 'next';
import Head from 'next/head';
import { MyLayout } from '@components/Layout';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { MyTab } from '@components/tab';
import { MyButton } from '@components/button';
import { MyTableExtension } from '@components/table/Extension';
import { MySelect } from '@components/select';
import { wrapper } from '@store/redux';

const Test: NextPage = () => {
    return (
        <>
            <Head>
                <title>우리인슈맨라이프</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
            </Head>
            <MyLayout>
                <div className={` wr-pages-popup`}>
                    <div className="wr-pages-detail__block">
                        <div className="wr-pages-detail__title">
                            <strong>장기 수수료 규정</strong>
                            <div className="wr-pages-detail__buttons">
                                <span>
                                    생성일시: 2023-09-20 오전 11:26:00 작성자:
                                    시스템관리자(W0010)
                                </span>
                                <div>
                                    <MyButton className="btn-warning">
                                        작성자변경
                                    </MyButton>
                                </div>
                            </div>
                        </div>
                        <div className="wr-pages-detail__content">
                            <div className="wr-pages-popup__header">
                                <div className="wr-pages-list__filter">
                                    <WithLabel label="규정명" type="active">
                                        <MyInput />
                                    </WithLabel>
                                </div>
                                <div className="wr-pages-list__filter">
                                    <WithLabel label="해당등급" type="active">
                                        <MyInput />
                                    </WithLabel>
                                </div>
                                <div className="wr-pages-list__filter">
                                    <WithLabel label="환수" type="active">
                                        <MyInput />
                                    </WithLabel>
                                </div>
                                <div className="wr-pages-list__filter">
                                    <WithLabel label="부활율(%)" type="active">
                                        <MyInput />
                                    </WithLabel>
                                </div>
                                <div className="wr-pages-list__filter">
                                    <WithLabel label="사용유무" type="active">
                                        <MyInput />
                                    </WithLabel>
                                </div>
                                <div className="wr-pages-list__filter">
                                    <WithLabel label="구간규정" type="active">
                                        <MyInput />
                                    </WithLabel>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className="wr-tab__wrap wr-mt" role="tablist">
                        <MyTab
                            id="test"
                            panelId="testPanel"
                            label="장기지급"
                            onClick={() => {}}
                            isActive={true}
                        />
                        <MyTab
                            id="test2"
                            panelId="testPanel2"
                            label="테스트 비활성탭"
                            onClick={() => {}}
                            isActive={false}
                        />
                        <li className="wr-tab__line"></li>
                    </ul>
                    <div className="wr-pages-detail__body">
                        <MyTabpanel id="testPanel" tabId="test" hidden={false}>
                            <div className="wr-frame__tabbody">
                                <div className="row">
                                    <div className="col-2">
                                        <WithLabel label="보험사" type="active">
                                            <MyInput />
                                        </WithLabel>
                                    </div>
                                    <div className="col-2">
                                        <WithLabel
                                            label="수수료항목"
                                            type="active"
                                        >
                                            <MyInput />
                                        </WithLabel>
                                    </div>
                                    <div className="col-2">
                                        <WithLabel
                                            label="상품종목"
                                            type="active"
                                        >
                                            <MyInput />
                                        </WithLabel>
                                    </div>
                                </div>
                                <div className="wr-table--normal wr-mt">
                                    <table className="wr-table table">
                                        <thead>
                                            <tr>
                                                <th style={{ width: '200px' }}>
                                                    <strong>보험사</strong>
                                                </th>
                                                <th style={{ width: '200px' }}>
                                                    <strong>수수료항목</strong>
                                                </th>
                                                <th style={{ width: '200px' }}>
                                                    <strong>산출기준</strong>
                                                </th>
                                                <th style={{ width: '200px' }}>
                                                    <strong>상품종목</strong>
                                                </th>
                                                <th style={{ width: '200px' }}>
                                                    <strong>시작회차</strong>
                                                </th>
                                                <th style={{ width: '200px' }}>
                                                    <strong>종료회차</strong>
                                                </th>
                                                <th style={{ width: '200px' }}>
                                                    <strong>지급율</strong>
                                                </th>
                                                <th rowSpan={2}>
                                                    <div className="wr-pages-detail__center">
                                                        <MyButton className="btn-warning">
                                                            추가
                                                        </MyButton>
                                                        <MyButton className="btn-success">
                                                            저장
                                                        </MyButton>
                                                    </div>
                                                </th>
                                            </tr>
                                            <tr>
                                                <th style={{ width: '200px' }}>
                                                    <MySelect />
                                                </th>
                                                <th style={{ width: '200px' }}>
                                                    <MySelect />
                                                </th>
                                                <th style={{ width: '200px' }}>
                                                    <MySelect />
                                                </th>
                                                <th style={{ width: '200px' }}>
                                                    <MySelect />
                                                </th>
                                                <th style={{ width: '200px' }}>
                                                    <MySelect />
                                                </th>
                                                <th style={{ width: '200px' }}>
                                                    <MySelect />
                                                </th>
                                                <th style={{ width: '200px' }}>
                                                    <MySelect />
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <span>농협손해</span>
                                                </td>
                                                <td>
                                                    <span>수수료항목</span>
                                                </td>
                                                <td>
                                                    <span>산출기준</span>
                                                </td>
                                                <td>
                                                    <span>상품종목</span>
                                                </td>
                                                <td>
                                                    <span>시작회차</span>
                                                </td>
                                                <td>
                                                    <span>종료회차</span>
                                                </td>
                                                <td>
                                                    <span>지급율</span>
                                                </td>
                                                <td>
                                                    <div className="wr-pages-detail__center">
                                                        <MyButton className="btn-danger">
                                                            삭제
                                                        </MyButton>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    {/* <MyTableExtension /> */}
                                </div>
                            </div>
                        </MyTabpanel>
                    </div>
                </div>
            </MyLayout>
        </>
    );
};

export default Test;
