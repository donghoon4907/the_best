import { all, fork } from 'redux-saga/effects';

import { watchLogin } from './login';
import { watchCreateUser } from './create-user';
import { watchGetOrgas } from './get-orgas';
import { watchGetUsers } from './get-users';
import { watchGetBanks } from './get-banks';
import { watchGetCompanies } from './get-companies';
import { watchGetAgencies } from './get-agencies';
// import { watchGetPermission } from './get-permission';
// import { watchGetIp } from './get-ip';

export function* hrSaga() {
    yield all([
        fork(watchLogin),
        fork(watchCreateUser),
        fork(watchGetOrgas),
        fork(watchGetUsers),
        fork(watchGetCompanies),
        fork(watchGetBanks),
        fork(watchGetAgencies),
        // fork(watchGetPermission),
        // fork(watchGetIp),
    ]);
}
