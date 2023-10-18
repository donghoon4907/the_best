import type { NextPage } from 'next';
import type { HrState } from '@reducers/hr';
import type { AppState } from '@reducers/index';
import Head from 'next/head';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MySelect } from '@components/select';
import { DEPART_DETAIL_TABS } from '@constants/tab';
import { MyTab } from '@components/tab';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import variables from '@styles/_variables.module.scss';
import { MyLayout } from '@components/Layout';
import { useInput, usePhoneInput } from '@hooks/use-input';
import { useApi } from '@hooks/use-api';
import { MyFooter } from '@components/footer';
import { MyButton } from '@components/button';
import { useSelect } from '@hooks/use-select';
import { wrapper } from '@store/redux';
import { permissionMiddleware } from '@utils/middleware/permission';
import { useTab } from '@hooks/use-tab';
import { END } from 'redux-saga';
import { POINT_STATUS } from '@constants/options/department';
import { useDatepicker } from '@hooks/use-datepicker';
import { usePostcode } from '@hooks/use-postcode';
import { MyDatepicker } from '@components/datepicker';
import { CommissionTabpanel } from '@partials/hr/department/tabpanels/Commission';
import { LifeLongModal } from '@components/modal/LifeLong';
import { PaymentTabpanel } from '@partials/hr/department/tabpanels/Payment';
import { MemoTabpanel } from '@partials/hr/department/tabpanels/Memo';
import { getOrgasRequest } from '@actions/hr/get-orgas';
import { showDepartSearchModal } from '@actions/modal/depart-search.action';
import { SelectDepartModal } from '@components/modal/SelectDepart';

const CreateHeadquarter: NextPage<HrState> = ({ users }) => {
    const displayName = 'wr-pages-hr-detail';

    const dispatch = useDispatch();

    const { orgas, selectedOrga } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    const [depart] = useSelect(orgas, null);

    // const createUser = useApi(createUserRequest);
    // 탭 관리
    const [tab, setTab] = useTab(DEPART_DETAIL_TABS[0]);
    // 수정 모드 여부
    const [editable, setEditable] = useState(true);
    // 사업부명
    const [name] = useInput('');
    // 전화번호
    const [phone] = usePhoneInput('');
    // 팩스번호
    const [fax] = usePhoneInput('');
    // 대표자
    const [manager] = useSelect(users, null);
    // 우편번호
    const [postcode, address1, address2, onClickPostcode] = usePostcode(
        {
            postcode: '',
            address1: '',
            address2: '',
        },
        { disabled: !editable },
    );
    // 상세 주소
    const [address3] = useInput('');
    // 지점현황
    const [pointStatus] = useSelect(POINT_STATUS, POINT_STATUS[0]);
    // 개점일자
    const [openDate] = useDatepicker(null);
    // 폐점일자
    const [closeDate] = useDatepicker(null);
    // 양력 or 음력
    // const [birthType] = useSelect(BIRTH_TYPE);

    const handleClickDepart = () => {
        dispatch(showDepartSearchModal());
    };

    const handleSubmit = () => {
        if (name.value === '') {
            return alert('이름을 입력하세요.');
        }

        // createUser(payload);
    };

    const handleModify = () => {
        setEditable(true);
    };

    const handleCancelModify = () => {
        const tf = confirm('수정을 취소하시겠습니까?');

        if (tf) {
            location.reload();
        }
    };

    const labelType = editable ? 'active' : 'disable';

    return (
        <>
            <Head>
                <title>본부등록</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
            </Head>
            <MyLayout>
                <div className={`${displayName} row`}>
                    <div className={`${displayName}__left col`}>
                        <div className="wr-frame__section">
                            <div className="wr-pages-detail__block">
                                <div className="wr-pages-detail__content">
                                    <div className="wr-group">
                                        <span
                                            className={`${displayName}__department ${
                                                selectedOrga
                                                    ? ''
                                                    : 'wr-label--required'
                                            }`}
                                        >
                                            {selectedOrga
                                                ? selectedOrga.label
                                                : '사업부를 선택하세요'}
                                        </span>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            type="button"
                                            onClick={handleClickDepart}
                                        >
                                            사업부변경
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="wr-pages-detail__block">
                                <div className="wr-pages-detail__content">
                                    <div className="row">
                                        <div className="col-6">
                                            <WithLabel
                                                id="name"
                                                label="본부명"
                                                type={labelType}
                                            >
                                                <MyInput
                                                    type="text"
                                                    id="name"
                                                    placeholder="본부명"
                                                    readOnly={!editable}
                                                />
                                            </WithLabel>
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                <WithLabel
                                                    id="manager"
                                                    label="대표자"
                                                    type={labelType}
                                                >
                                                    <MySelect
                                                        placeholder={'선택'}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!editable}
                                                        {...manager}
                                                    />
                                                </WithLabel>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row wr-mt">
                                        <div className="col-6">
                                            <WithLabel
                                                id="phone"
                                                label="전화번호"
                                                type={labelType}
                                            >
                                                <MyInput
                                                    type="text"
                                                    id="phone"
                                                    placeholder="전화번호"
                                                    readOnly={!editable}
                                                    {...phone}
                                                />
                                            </WithLabel>
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                <WithLabel
                                                    id="fax"
                                                    label="팩스번호"
                                                    type={labelType}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="fax"
                                                        placeholder="팩스번호"
                                                        readOnly={!editable}
                                                        {...fax}
                                                    />
                                                </WithLabel>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row wr-mt">
                                        <div className="col-6">
                                            <WithLabel
                                                label="주소"
                                                type={labelType}
                                            >
                                                <div className="wr-pages-detail__with">
                                                    <MyInput
                                                        type="text"
                                                        placeholder="우편번호"
                                                        readOnly
                                                        onClick={
                                                            onClickPostcode
                                                        }
                                                        {...postcode}
                                                        button={{
                                                            type: 'button',
                                                            disabled: !editable,
                                                            onClick:
                                                                onClickPostcode,
                                                            children: (
                                                                <>
                                                                    <span>
                                                                        찾기
                                                                    </span>
                                                                </>
                                                            ),
                                                        }}
                                                    />
                                                </div>
                                            </WithLabel>
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                <MyInput
                                                    type="text"
                                                    placeholder="주소1"
                                                    readOnly
                                                    {...address1}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row wr-mt">
                                        <div className="col-6">
                                            <WithLabel
                                                id="addr2"
                                                label="상세주소"
                                                type={labelType}
                                            >
                                                <MyInput
                                                    type="text"
                                                    id="addr2"
                                                    placeholder="상세주소"
                                                    readOnly={!editable}
                                                    {...address3}
                                                />
                                            </WithLabel>
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                <MyInput
                                                    type="text"
                                                    placeholder="주소2"
                                                    readOnly
                                                    {...address2}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row wr-mt">
                                        <div className="col-6">
                                            <WithLabel
                                                id="pointStatus"
                                                label="지점현황"
                                                type={labelType}
                                            >
                                                <MySelect
                                                    id="pointStatus"
                                                    height={
                                                        variables.detailFilterHeight
                                                    }
                                                    isDisabled={!editable}
                                                    {...pointStatus}
                                                />
                                            </WithLabel>
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                <WithLabel
                                                    id="openDate"
                                                    label="개점일자"
                                                    type={labelType}
                                                >
                                                    <MyDatepicker
                                                        id="openDate"
                                                        size="md"
                                                        placeholder="개점일자"
                                                        readOnly={!editable}
                                                        hooks={openDate}
                                                    />
                                                </WithLabel>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row wr-mt">
                                        <div className="col-6">
                                            <WithLabel
                                                id="closeDate"
                                                label="폐점일자"
                                                type={labelType}
                                            >
                                                <MyDatepicker
                                                    id="closeDate"
                                                    size="md"
                                                    placeholder="폐점일자"
                                                    readOnly={!editable}
                                                    hooks={closeDate}
                                                />
                                            </WithLabel>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${displayName}__right col`}>
                        <div className="wr-ml position-relative">
                            <ul className="wr-tab__wrap" role="tablist">
                                {DEPART_DETAIL_TABS.slice(0, 3).map((v) => (
                                    <MyTab
                                        key={v.id}
                                        onClick={setTab}
                                        isActive={v.id === tab.id}
                                        {...v}
                                    />
                                ))}
                                <li className="wr-tab__line"></li>
                            </ul>
                            <div
                                className={`${displayName}__body wr-frame__tabbody`}
                            >
                                <CommissionTabpanel
                                    id="tabpanelCommission"
                                    tabId="tabCommission"
                                    hidden={tab.id !== 'tabCommission'}
                                    editable={editable}
                                />
                                <PaymentTabpanel
                                    id="tabpanelPayment"
                                    tabId="tabPayment"
                                    hidden={tab.id !== 'tabPayment'}
                                    editable={editable}
                                />
                                <MemoTabpanel
                                    id="tabpanelMemo"
                                    tabId="tabMemo"
                                    hidden={tab.id !== 'tabMemo'}
                                    editable={editable}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <MyFooter>
                    <div className="wr-footer__between">
                        <div></div>
                        <div className="wr-pages-detail__buttons">
                            {editable && (
                                <MyButton
                                    className="btn-secondary"
                                    onClick={handleCancelModify}
                                >
                                    취소
                                </MyButton>
                            )}
                            <MyButton
                                type="button"
                                className="btn-primary"
                                onClick={editable ? handleSubmit : handleModify}
                            >
                                등록
                            </MyButton>
                        </div>
                    </div>
                </MyFooter>
            </MyLayout>
            <LifeLongModal />
            <SelectDepartModal />
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    permissionMiddleware(async ({ dispatch, sagaTask, getState }, ctx) => {
        dispatch(getOrgasRequest());

        dispatch(END);

        await sagaTask?.toPromise();

        return null;
    }),
);

export default CreateHeadquarter;
