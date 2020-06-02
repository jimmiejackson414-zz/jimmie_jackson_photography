import LogRocket from 'logrocket';
import createPlugin from 'logrocket-vuex';

const logrocketPlugin = createPlugin(LogRocket);

export const state = () => ({});

export const plugins = [logrocketPlugin];