// AddCourseModal.stories.tsx
import React from 'react';
import { AddCourseModal } from './AddCourseModal';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AddCourseModal> = {
  title: 'Components/AddCourseModal',
  component: AddCourseModal,
};

export default meta;

type Story = StoryObj<typeof AddCourseModal>;

export const Default: Story = {
  render: () => <AddCourseModal />,
};
