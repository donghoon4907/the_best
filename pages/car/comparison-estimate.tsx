import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MyEditor } from '@components/editor';
import { WithLabel } from '@components/WithLabel';
import { MySelect } from '@components/select';
import { MyInput } from '@components/input';
import { MyLabel } from '@components/label';
import { DatePicker } from 'rsuite';
import { MyRadio } from '@components/radio';

const ComparisonEstimate: NextPage = () => {
    const dispatch = useDispatch();

    const [content, setContent] = useState<string>('');

    const handleChangeContent = (content: string) => {
        setContent(content);
    };

    return (
        <>
            <Head>
                <title>비교견적</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="wr-pages-comparison-estimate">
                {/* <Breadcrumb /> */}
                <div className="mb-2">
                    <h2>자동차 비교견적 산출</h2>
                </div>
                <div className="wr-pages-comparison-estimate-header">
                    <div className="wr-pages-comparison-estimate-header__left">
                        <MyLabel id="point">지점</MyLabel>
                        <div style={{ width: 150 }}>
                            <MySelect
                                inputId="point"
                                options={[]}
                                value={null}
                                onChange={() => {}}
                                placeholder={'5회사 임직원'}
                            />
                        </div>
                        <div style={{ width: 150 }}>
                            <MySelect
                                options={[]}
                                value={null}
                                onChange={() => {}}
                                placeholder={'전체'}
                            />
                        </div>
                        <div style={{ width: 150 }}>
                            <MySelect
                                options={[]}
                                value={null}
                                onChange={() => {}}
                                placeholder={'사용자명'}
                            />
                        </div>
                    </div>
                    <div className="wr-pages-comparison-estimate-header__right">
                        <MyLabel id="charge">담당</MyLabel>
                        <div style={{ width: 150 }}>
                            <MyInput type="text" id="charge" placeholder="" />
                        </div>
                        <MyLabel id="status">처리상태</MyLabel>
                        <div style={{ width: 150 }}>
                            <MySelect
                                inputId="status"
                                options={[]}
                                value={null}
                                onChange={() => {}}
                                placeholder={'견적신청'}
                            />
                        </div>
                    </div>
                </div>
                <div className="row wr-pages-comparison-estimate-body mt-2">
                    <div className="col-6 wr-pages-comparison-estimate-customer">
                        <div className="wr-pages-comparison-estimate-customer__header">
                            <h3>고객기본정보</h3>
                        </div>
                        <div className="wr-pages-comparison-estimate-customer__body">
                            <div className="wr-pages-comparison-estimate-customer__record">
                                <div className="wr-pages-comparison-estimate-customer__label">
                                    <label>주민번호</label>
                                </div>
                                <div className="wr-pages-comparison-estimate-customer__description">
                                    <div style={{ width: 150 }}>
                                        <MyInput placeholder="500202" />
                                    </div>
                                    <div>-</div>
                                    <div style={{ width: 25 }}>
                                        <MyInput placeholder="1" />
                                    </div>
                                    <div>******</div>
                                    <div>&#40; 만 66세 &#41;</div>
                                </div>
                            </div>
                            <div className="wr-pages-comparison-estimate-customer__record">
                                <div className="wr-pages-comparison-estimate-customer__label">
                                    <label>차량번호</label>
                                </div>
                                <div className="wr-pages-comparison-estimate-customer__description">
                                    <div style={{ width: 80 }}>
                                        <MySelect
                                            options={[]}
                                            height="22px"
                                            value={null}
                                            onChange={() => {}}
                                            placeholder={'전체'}
                                        />
                                    </div>
                                    <div style={{ width: 35 }}>
                                        <MyInput placeholder="66" />
                                    </div>
                                    <div style={{ width: 60 }}>
                                        <MySelect
                                            options={[]}
                                            height="22px"
                                            value={null}
                                            onChange={() => {}}
                                            placeholder={'가'}
                                        />
                                    </div>
                                    <div style={{ width: 50 }}>
                                        <MyInput placeholder="8337" />
                                    </div>
                                    <div style={{ width: 90 }}>
                                        <MyInput placeholder="66가8337" />
                                    </div>
                                </div>
                            </div>
                            <div className="wr-pages-comparison-estimate-customer__record">
                                <div className="wr-pages-comparison-estimate-customer__label">
                                    <label>가입예정일</label>
                                </div>
                                <div className="wr-pages-comparison-estimate-customer__description">
                                    <DatePicker
                                        oneTap
                                        format="yyyy-MM-dd"
                                        style={{ width: 150 }}
                                        size="xs"
                                        placeholder="2023-06-29"
                                    />
                                    <div style={{ width: 50 }}>
                                        <button
                                            type="button"
                                            className="btn btn-warning"
                                            style={{
                                                padding: '0px 5px !important',
                                                fontSize: 12,
                                                height: 22,
                                                width: '100%',
                                                border: '1px solid gray',
                                            }}
                                        >
                                            오늘
                                        </button>
                                    </div>
                                    <div>~</div>
                                    <DatePicker
                                        oneTap
                                        format="yyyy-MM-dd"
                                        style={{ width: 150 }}
                                        size="xs"
                                        placeholder="2023-06-29"
                                    />
                                </div>
                            </div>
                            <div className="wr-pages-comparison-estimate-customer__record">
                                <div className="wr-pages-comparison-estimate-customer__label">
                                    <label>개발원조회</label>
                                </div>
                                <div className="wr-pages-comparison-estimate-customer__description">
                                    <div style={{ width: 50 }}>
                                        <button
                                            type="button"
                                            className="btn btn-warning"
                                            style={{
                                                padding: '0px 5px !important',
                                                fontSize: 12,
                                                height: 22,
                                                width: '100%',
                                                border: '1px solid gray',
                                            }}
                                        >
                                            현대
                                        </button>
                                    </div>
                                    <div style={{ width: 70 }}>
                                        <button
                                            type="button"
                                            className="btn btn-warning"
                                            style={{
                                                padding: '0px 5px !important',
                                                fontSize: 12,
                                                height: 22,
                                                width: '100%',
                                                border: '1px solid gray',
                                            }}
                                        >
                                            DB&#40;신규&#41;
                                        </button>
                                    </div>
                                    <div style={{ width: 70 }}>
                                        <button
                                            type="button"
                                            className="btn btn-warning"
                                            style={{
                                                padding: '0px 5px !important',
                                                fontSize: 12,
                                                height: 22,
                                                width: '100%',
                                                border: '1px solid gray',
                                            }}
                                        >
                                            DB&#40;갱신&#41;
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="wr-pages-comparison-estimate-customer__record">
                                <div className="wr-pages-comparison-estimate-customer__label">
                                    <label>고객명</label>
                                </div>
                                <div className="wr-pages-comparison-estimate-customer__description">
                                    <div style={{ width: 230 }}>
                                        <MyInput placeholder="" />
                                    </div>
                                    <div style={{ width: 100 }}>
                                        <button
                                            type="button"
                                            className="btn btn-warning"
                                            style={{
                                                padding: '0px 5px !important',
                                                fontSize: 12,
                                                height: 22,
                                                width: '100%',
                                                border: '1px solid gray',
                                            }}
                                        >
                                            고객상세사항
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="wr-pages-comparison-estimate-customer__record">
                                <div className="wr-pages-comparison-estimate-customer__label">
                                    <label>차량용도</label>
                                </div>
                                <div className="wr-pages-comparison-estimate-customer__description">
                                    <MyRadio
                                        id="usage1"
                                        name="usage"
                                        label="출퇴근용(영리)"
                                    />
                                    <MyRadio
                                        id="usage2"
                                        label="사업용(비영리)"
                                    />
                                    <MyRadio id="usage3" label="종교단체" />
                                </div>
                            </div>
                            <div className="wr-pages-comparison-estimate-customer__record">
                                <div className="wr-pages-comparison-estimate-customer__label">
                                    <label>가족한정</label>
                                </div>
                                <div className="wr-pages-comparison-estimate-customer__description">
                                    <div style={{ width: 150 }}>
                                        <MySelect
                                            options={[]}
                                            height="22px"
                                            value={null}
                                            onChange={() => {}}
                                            placeholder={'가족+형제'}
                                        />
                                    </div>
                                    <div>어린이특약</div>
                                    <div style={{ width: 100 }}>
                                        <MySelect
                                            options={[]}
                                            height="22px"
                                            value={null}
                                            onChange={() => {}}
                                            placeholder={'선택'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="wr-pages-comparison-estimate-customer__record">
                                <div className="wr-pages-comparison-estimate-customer__label">
                                    <label>운전자연령</label>
                                </div>
                                <div className="wr-pages-comparison-estimate-customer__description">
                                    <div style={{ width: 150 }}>
                                        <MySelect
                                            options={[]}
                                            height="22px"
                                            value={null}
                                            onChange={() => {}}
                                            placeholder={'만26세이상'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="wr-pages-comparison-estimate-customer__record">
                                <div className="wr-pages-comparison-estimate-customer__label">
                                    <label>납입방법</label>
                                </div>
                                <div className="wr-pages-comparison-estimate-customer__description">
                                    <div style={{ width: 150 }}>
                                        <MySelect
                                            options={[]}
                                            height="22px"
                                            value={null}
                                            onChange={() => {}}
                                            placeholder={'일시납'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="wr-pages-comparison-estimate-customer__record">
                                <div className="wr-pages-comparison-estimate-customer__label">
                                    <label>물적사고 할증</label>
                                </div>
                                <div className="wr-pages-comparison-estimate-customer__description">
                                    <div style={{ width: 150 }}>
                                        <MySelect
                                            options={[]}
                                            height="22px"
                                            value={null}
                                            onChange={() => {}}
                                            placeholder={'200만원'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="wr-pages-comparison-estimate-customer__record">
                                <div className="wr-pages-comparison-estimate-customer__label">
                                    <label>전보험사</label>
                                </div>
                                <div className="wr-pages-comparison-estimate-customer__description">
                                    <div style={{ width: 150 }}>
                                        <MySelect
                                            options={[]}
                                            height="22px"
                                            value={null}
                                            onChange={() => {}}
                                            placeholder={''}
                                        />
                                    </div>
                                    <div style={{ width: 30 }}></div>
                                    <MyLabel>전계약NO</MyLabel>
                                    <div style={{ width: 230 }}>
                                        <MyInput placeholder="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6"></div>
                </div>
            </div>
        </>
    );
};

export default ComparisonEstimate;
