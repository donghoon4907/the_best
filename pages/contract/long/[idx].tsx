import type { NextPage } from 'next';
import type { LongState } from '@reducers/long';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { wrapper } from '@store/redux';
import { permissionMiddleware } from '@utils/middleware/permission';
import longConstants from '@constants/options/long';
import longsService from '@services/longsService';
import { getCompaniesRequest } from '@actions/hr/get-companies';
import { findSelectOption, findSelectOptionByLabel } from '@utils/getter';
import { LongForm } from '@partials/contract/long/LongForm';
import { createUserHistory } from '@actions/common/set-user-history.action';
import { createInsured } from '@actions/contract/common/set-insured.action';
import { createPay } from '@actions/contract/long/set-pay.action';
import { makeDistkind } from '@utils/calculator';
import { getOrgasRequest } from '@actions/hr/get-orgas';
import { updateProduct } from '@actions/contract/common/set-product.action';
import { createContact } from '@actions/common/set-contact.action';
import { MyLayout } from '@components/Layout';
import { useInitCustomer, useInitTab } from '@hooks/use-initialize';

const Long: NextPage<LongState> = ({ long }) => {
    const { longUseCompanies } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );
    // 탭 설정
    useInitTab(`장기계약상세${long.c_name ? ` - ${long.c_name}` : ''}`);
    // console.log(long.c_idx);
    // 계약자 설정
    useInitCustomer(long.c_idx);

    const defaultComp = findSelectOption(long.wcode, longUseCompanies);

    const defaultPayCycle = findSelectOptionByLabel(
        long.pay_cycle,
        longConstants.payCycle,
    );

    // const defaultPayDu = findSelectOption(long.pay_du, longConstants.payDu);

    const defaultStatus = findSelectOption(long.status, longConstants.status);

    const defaultPstatus = findSelectOption(
        long.pay_status,
        longConstants.pStatus,
    );

    const defaultCalType = findSelectOption(
        long.cal_type,
        longConstants.calType,
    );

    let defaultFamily;
    if (long.hasOwnProperty('family')) {
        defaultFamily = findSelectOption(
            long.family ? 'Y' : 'N',
            longConstants.family,
        );
    }

    return (
        <>
            <Head>
                <title>장기계약상세</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
            </Head>
            <MyLayout>
                <LongForm
                    mode="update"
                    idx={long.idx}
                    defaultUserid={long.userid}
                    defaultComp={defaultComp}
                    defaultCnum={long.cnum}
                    defaultTitle={long.title}
                    defaultContdate={long.contdate}
                    defaultBodateto={long.bo_dateto}
                    defaultBoDu={long.bo_du}
                    defaultPayCycle={defaultPayCycle}
                    defaultPayDateto={long.pay_dateto}
                    defaultPayDu={long.pay_du}
                    defaultStatus={defaultStatus}
                    defaultPstatus={defaultPstatus}
                    defaultStatusDate={long.status_date}
                    defaultLastMonth={long.lastmonth}
                    defaultLastWhoi={long.lastwhoi}
                    defaultSpec={long.spec}
                    defaultSubCategory={long.subcategory}
                    defaultIsConfirm={long.confirm}
                    defaultCalSpec={long.cal_spec}
                    defaultPayment={long.payment.toString()}
                    defaultTp={long.tp ? long.tp.toString() : ''}
                    defaultTp1={long.tp1 ? long.tp1.toString() : ''}
                    defaultTp2={long.tp2 ? long.tp2.toString() : ''}
                    defaultTp3={long.tp3 ? long.tp3.toString() : ''}
                    defaultTpu={long.tpu ? long.tpu.toString() : ''}
                    defaultPayBo={long.pay_bo ? long.pay_bo.toString() : ''}
                    defaultPayJ={long.pay_j ? long.pay_j.toString() : ''}
                    defaultPayS={long.pay_s ? long.pay_s.toString() : ''}
                    defaultCalType={defaultCalType}
                    defaultCalDatefrom={long.cal_datefrom}
                    defaultFamily={defaultFamily}
                />
            </MyLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    permissionMiddleware(async ({ dispatch, sagaTask }, ctx) => {
        const { query } = ctx;

        const idx = query.idx as string;

        dispatch(getOrgasRequest());

        dispatch(getCompaniesRequest('long-use'));

        const output: any = {
            props: {},
        };

        try {
            dispatch(END);

            await sagaTask?.toPromise();

            const { data } = await longsService.getLong({ idx });

            const long = data.data;

            output.props.long = long;

            dispatch(
                updateProduct({
                    p_code: long.p_code,
                    title: long.title,
                    spec: long.spec,
                    subcategory: long.subcategory ? long.subcategory : '',
                    cal_spec: long.cal_spec ? long.cal_spec : '',
                }),
            );

            if (long.userid_his) {
                for (let i = 0; i < long.userid_his.length; i++) {
                    dispatch(
                        createUserHistory({
                            index: i,
                            checked: false,
                            gdate: long.userid_his[i].gdate,
                            group: long.userid_his[i].group,
                            userid: long.userid_his[i].userid,
                            username: long.userid_his[i].fcname,
                        }),
                    );
                }
            }

            if (long.p_persons) {
                for (let i = 0; i < long.p_persons.length; i++) {
                    dispatch(
                        createInsured({
                            ...long.p_persons[i],
                            index: i,
                            checked: false,
                        }),
                    );
                }
            }

            if (long.pays) {
                for (let i = 0; i < long.pays.length; i++) {
                    dispatch(
                        createPay({
                            index: i,
                            checked: false,
                            idx: long.pays[i].idx,
                            paydate: long.pays[i].paydate,
                            gdate: long.pays[i].gdate,
                            whoi: long.pays[i].whoi,
                            dist: long.pays[i].dist,
                            pay: long.pays[i].pay,
                            method: long.pays[i].method,
                            insert_datetime: long.pays[i].insert_datetime,
                            cycle: long.pays[i].cycle
                                ? findSelectOptionByLabel(
                                      long.pays[i].cycle,
                                      longConstants.payCycle,
                                  ).value
                                : undefined,
                            distkind: makeDistkind(
                                new Date(long.contdate),
                                new Date(long.pays[i].paydate),
                                long.pays[i].whoi,
                            ),
                        }),
                    );
                }
            }

            if (long.contacts) {
                for (let i = 0; i < long.contacts.length; i++) {
                    dispatch(
                        createContact({
                            ...long.contacts[i],
                            index: i,
                            checked: false,
                        }),
                    );
                }
            }
        } catch {
            output.redirect = {
                destination: '/404',
                permanent: true, // true로 설정하면 301 상태 코드로 리다이렉션
            };
        }

        return output;
    }),
);

export default Long;
