/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import Step1 from './step-1';
import Step2 from './step-2';
import { InsertCompany, PracticeType } from '@workspace/database';

type Props = {};
export type Step = 'step1' | 'step2' | 'step3';
export type StepFormData = {
    step1: {
        practiceType: PracticeType | null;
    };
    step2: InsertCompany | null;
    step3: any;
};
export default function Content({}: Props) {
    const [step, setStep] = useState<'step1' | 'step2' | 'step3'>('step1');
    const [stepFormData, setStepFormData] = useState<StepFormData>({
        step1: {
            practiceType: null,
        },
        step2: null,
        step3: {},
    });
    if (step === 'step1') {
        return (
            <Step1
                onNextStep={(value: Step) => setStep(value)}
                setStepFormData={setStepFormData}
                practiceType={stepFormData.step1.practiceType}
            />
        );
    } else if (step === 'step2') {
        return (
            <div>
                <Step2 onPrevious={() => setStep('step1')} />
            </div>
        );
    }
    return <div></div>;
}
