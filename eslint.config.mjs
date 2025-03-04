import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ['**/*.{js,mjs,cjs,jsx}'],
        languageOptions: { globals: globals.browser },

        // 기본 설정 추가
        ...pluginJs.configs.recommended,
        ...pluginReact.configs.flat.recommended,

        rules: {
            camelcase: ['error', { properties: 'always' }], // 변수명 카멜케이스 강제
            semi: ['error', 'always'], // 세미콜론 필수
            'prefer-const': 'error', // 재할당 되는 경우가 아니면 let 아닌 const 사용
            'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // 사용하지 않는 변수 선언 금지
            curly: 'error', // 중괄호 `{}` 필수 (if, for 등에서 한 줄일 때도
            eqeqeq: ['error', 'always'], // `==` 대신 `===` 사용 강제
            'react/react-in-jsx-scope': 'warn', // 불필요한 React import 경고
        },
    },
];
