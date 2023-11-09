import type { NextPage } from 'next';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import type { CarState } from '@reducers/car';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { wrapper } from '@store/redux';
import { permissionMiddleware } from '@utils/middleware/permission';
import carsService from '@services/carsService';
import { getCompaniesRequest } from '@actions/hr/get-companies';
import { findSelectOption } from '@utils/getter';
import longConstants from '@constants/options/long';
import carConstants from '@constants/options/car';
import { createUserHistory } from '@actions/common/set-user-history.action';
import { createPay } from '@actions/contract/long/set-pay.action';
import { getOrgasRequest } from '@actions/hr/get-orgas';
import { createContact } from '@actions/common/set-contact.action';
import { updateProduct } from '@actions/contract/common/set-product.action';
import { MyLayout } from '@components/Layout';
import { CarForm } from '@partials/contract/car/CarForm';
import { useInitCustomer, useInitTab } from '@hooks/use-initialize';
import { createInfoCust } from '@actions/contract/common/set-info-cust.action';
import { createInfoProduct } from '@actions/contract/common/set-info-product.action';

const Car: NextPage<CarState> = ({ car }) => {
    const { carUseCompanies } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    // 탭 설정
    useInitTab(`자동차계약상세${car.c_name ? ` - ${car.c_name}` : ''}`);
    // 계약자 설정
    useInitCustomer(car.c_idx);

    const defaultComp = findSelectOption(car.wcode, carUseCompanies);

    const defaultPreComp = findSelectOption(car.pre_wcode, carUseCompanies);

    const defaultStatus = findSelectOption(car.status, longConstants.status);

    const defaultBodesc = findSelectOption(car.bo_desc, carConstants.shortDist);

    const defaultInsu = findSelectOption(car.insu, carConstants.dist);

    const defaultRate = findSelectOption(car.rate, carConstants.cGrade);

    const defaultCycle = findSelectOption(car.cycle, carConstants.payMethod);

    const defaultCarfamily = findSelectOption(
        car.carfamily,
        carConstants.driverRange,
    );

    const defaultCarage = findSelectOption(car.carage, carConstants.minAge);

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
                <CarForm
                    mode="update"
                    idx={car.idx}
                    defaultOrganize={car.organize}
                    defaultUserid={car.userid}
                    defaultComp={defaultComp}
                    defaultPreComp={defaultPreComp}
                    defaultCnum={car.cnum}
                    defaultPreCnum={car.pre_cnum}
                    defaultBodatefrom={car.bo_datefrom}
                    defaultBodateto={car.bo_dateto}
                    defaultBodesc={defaultBodesc}
                    defaultStatus={defaultStatus}
                    defaultIsConfirm={car.confirm ? 'Y' : 'N'}
                    defaultInsu={defaultInsu}
                    defaultRate={defaultRate}
                    defaultCycle={defaultCycle}
                    defaultCarfamily={defaultCarfamily}
                    defaultCarage={defaultCarage}
                />
            </MyLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    permissionMiddleware(async ({ dispatch, sagaTask }, ctx) => {
        const { query } = ctx;

        const idx = query.idx as string;

        dispatch(getOrgasRequest({}));

        dispatch(getCompaniesRequest('long-use'));

        const output: any = {
            props: {},
        };

        try {
            const { data } = await carsService.getCar({ idx });

            const car = data.data;

            output.props.car = car;

            dispatch(
                updateProduct({
                    p_code: car.p_code,
                    title: car.title,
                    spec: car.spec,
                    subcategory: null,
                    cal_spec: car.cal_spec,
                }),
            );

            if (car.userid_his) {
                for (let i = 0; i < car.userid_his.length; i++) {
                    dispatch(
                        createUserHistory({
                            index: i,
                            checked: false,
                            gdate: car.userid_his[i].gdate,
                            group: car.userid_his[i].group,
                            userid: car.userid_his[i].userid,
                            username: car.userid_his[i].fcname,
                        }),
                    );
                }
            }

            if (car.info_custom) {
                for (let i = 0; i < car.info_custom.length; i++) {
                    const info_custom = car.info_custom[i];

                    dispatch(
                        createInfoCust({
                            index: i,
                            checked: false,
                            key: info_custom.key,
                            value: info_custom.value,
                        }),
                    );
                }
            }

            if (car.info_product) {
                for (let i = 0; i < car.info_product.length; i++) {
                    const info_product = car.info_product[i];

                    dispatch(
                        createInfoProduct({
                            index: i,
                            checked: false,
                            key: info_product.key,
                            value: info_product.value,
                        }),
                    );
                }
            }

            // if (car.p_persons) {
            //     for (let i = 0; i < car.p_persons.length; i++) {
            //         let age = null;
            //         if (car.p_persons[i].dist === '주피보험자') {
            //             if (car.p_persons[i].jumin) {
            //                 age = residentNumToAge(car.p_persons[i].jumin);
            //             }
            //         } else {
            //             if (car.p_persons[i].birthday) {
            //                 age = birthdayToAge(
            //                     new Date(car.p_persons[i].birthday),
            //                 );
            //             }
            //         }

            //         if (age) {
            //             age -= 1;
            //         }

            //         dispatch(
            //             createInsured({
            //                 ...car.p_persons[i],
            //                 index: i,
            //                 checked: false,
            //                 age,
            //             }),
            //         );
            //     }
            // }

            if (car.pays) {
                const reversedCars = car.pays.reverse();

                for (let i = 0; i < reversedCars.length; i++) {
                    const pay = reversedCars[i];

                    dispatch(
                        createPay({
                            index: i,
                            checked: false,
                            idx: pay.idx,
                            paydate: pay.paydate,
                            dist: pay.dist,
                            pay: pay.pay,
                            pay1: pay.pay1,
                            pay2: pay.pay2,
                            method: pay.method,
                            insert_datetime: pay.insert_datetime,
                            insert_userid: pay.insert_userid,
                            confirm: pay.confirm,
                            cals: pay.cals,
                        }),
                    );
                }
            }

            if (car.contacts) {
                for (let i = 0; i < car.contacts.length; i++) {
                    dispatch(
                        createContact({
                            ...car.contacts[i],
                            index: i,
                            checked: false,
                        }),
                    );
                }
            }

            dispatch(END);

            await sagaTask?.toPromise();
        } catch {
            output.redirect = {
                destination: '/404',
                permanent: true, // true로 설정하면 301 상태 코드로 리다이렉션
            };
        }

        return output;
    }),
);

export default Car;
