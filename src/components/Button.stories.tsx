import type { Meta, StoryObj } from '@storybook/react';

import ButtonE from './button/Button';

const meta: Meta<typeof ButtonE> = {
    component: ButtonE,
};

export default meta;
type Story = StoryObj<typeof ButtonE>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
    render: () => <ButtonE />,
};