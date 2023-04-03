import { Option } from './types';

export const $ = {
	textarea: (): Option<HTMLTextAreaElement> => document.querySelector('textarea'),
};
