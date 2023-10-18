import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';
import type { Orga } from '@models/orga';

export const GET_ORGAS_KEY = 'GET_ORGAS';

export const GetOrgasActionTypes = {
    REQUEST: `${GET_ORGAS_KEY}_REQUEST`,
    SUCCESS: `${GET_ORGAS_KEY}_SUCCESS`,
    FAILURE: `${GET_ORGAS_KEY}_FAILURE`,
} as const;

export type GetOrgasSuccessPayload = Orga[];

export interface GetOrgasRequestAction extends Action<string> {}

export interface GetOrgasSuccessAction extends Action<string> {
    payload: GetOrgasSuccessPayload;
}

export function getOrgasRequest(): GetOrgasRequestAction {
    return {
        type: GetOrgasActionTypes.REQUEST,
    };
}

export function getOrgasSuccess(
    payload: GetOrgasSuccessPayload,
): GetOrgasSuccessAction {
    return {
        type: GetOrgasActionTypes.SUCCESS,
        payload,
    };
}
