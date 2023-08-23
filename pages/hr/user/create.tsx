import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import { getOrgasRequest } from '@actions/hr/get-orgas';
import { wrapper } from '@store/redux';
import { permissionMiddleware } from '@utils/middleware/permission';
import { UserForm } from '@partials/hr/user/UserForm';
import { getBanksRequest } from '@actions/hr/get-banks.deprecated';
import { getAgenciesRequest } from '@actions/hr/get-agencys';
import { showDepartSearchModal } from '@actions/modal/depart-search.action';
import { getCompaniesRequest } from '@actions/hr/get-companies';

const CreateUser: NextPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // 부서 선택 모달 열기
        dispatch(showDepartSearchModal());
    }, []);

    return (
        <>
            <Head>
                <title>영업가족등록</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
            </Head>
            <UserForm mode="create" />
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    permissionMiddleware(async ({ dispatch, sagaTask }) => {
        dispatch(
            getOrgasRequest({
                idx: '1',
            }),
        );

        // dispatch(getBanksRequest());

        dispatch(getAgenciesRequest());

        dispatch(getCompaniesRequest('insu'));

        dispatch(getCompaniesRequest('bank'));

        dispatch(END);

        await sagaTask?.toPromise();

        return null;
    }),
);

export default CreateUser;
