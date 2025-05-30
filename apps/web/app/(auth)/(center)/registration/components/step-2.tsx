'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { DynamicFormField } from '@workspace/ui/components/dynamic-form-field';
import { Form } from '@workspace/ui/components/form';
import { Button } from '@workspace/ui/components/button';
// import { InsertCompany, insertCompanySchema } from '@workspace/database/';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    InsertCompany,
    insertCompanySchema,
} from '@workspace/database/dist/schema/company';
// import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';

type Props = {
    onPrevious: VoidFunction;
};
// const formSchema = z.object({
//         companyName: z.string().min(2),
//         companyNumber: z.string().min(2),
//         vatNumber: z.string().min(2),
//         address1: z.string().min(2),
//         address2: z.string().min(2),
//         city: z.string().min(2),
//         postcode: z.string().min(2),
//         phoneNumber: z.string().min(2),
//     });
//     export type Company
export default function Step2({ onPrevious }: Props) {
    const form = useForm<InsertCompany>({
        resolver: zodResolver(insertCompanySchema),
        defaultValues: {
            name: '',
        },
    });
    function onSubmit(values: InsertCompany) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }
    return (
        <div className="max-w-md w-full space-y-8">
            <div className="text-center">
                <div className="flex justify-center items-center mb-8">
                    <div className="text-3xl font-semibold text-primary mr-3">
                        TAXAPP
                    </div>
                    <div className="bg-primary text-white text-sm font-semibold px-3 py-1 rounded">
                        MTD Ready
                    </div>
                </div>
                <div className="flex items-center justify-center mb-4">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </div>
                        <div className="w-12 h-0.5 bg-primary mx-2"></div>
                        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                            2
                        </div>
                        <div className="w-12 h-0.5 bg-gray-300 mx-2"></div>
                        <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
                            3
                        </div>
                        <div className="w-12 h-0.5 bg-gray-300 mx-2"></div>
                        <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
                            4
                        </div>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Company Information
                </h2>
                <p className="text-gray-600">Tell us about your practice</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <DynamicFormField
                            control={form.control}
                            name={'name'}
                            type={'text'}
                            label="Company Name"
                            placeholder="Enter your company name"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <DynamicFormField
                                control={form.control}
                                name={'companyNumber'}
                                type={'number'}
                                label="Company Number"
                                placeholder="12345678"
                            />
                            <DynamicFormField
                                control={form.control}
                                name={'vatNumber'}
                                type={'number'}
                                label="VAT Number (Optional)"
                                placeholder="GB123456789"
                            />
                        </div>

                        <div>
                            <DynamicFormField
                                control={form.control}
                                name={'addressLine1'}
                                type={'text'}
                                label="Business Address"
                                placeholder="Address Line 1"
                            />
                            <DynamicFormField
                                control={form.control}
                                name={'addressLine2'}
                                type={'text'}
                                placeholder="Address Line 2 (Optional)"
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <DynamicFormField
                                    control={form.control}
                                    name={'city'}
                                    type={'text'}
                                    placeholder="City"
                                />
                                <DynamicFormField
                                    control={form.control}
                                    name={'postcode'}
                                    type={'text'}
                                    placeholder="Postcode"
                                />
                            </div>
                        </div>
                        <DynamicFormField
                            control={form.control}
                            name={'phoneNumber'}
                            type={'text'}
                            label="Phone Number"
                            placeholder="+44 20 1234 5678"
                        />
                    </form>
                </Form>

                <div className="flex space-x-4 mt-6">
                    <div className="flex-1">
                        <Button
                            variant={'secondary'}
                            size={'xl'}
                            className="text-base  bg-gray-100 text-gray-700 w-full  font-medium hover:bg-gray-200"
                            type="button"
                            onClick={onPrevious}
                        >
                            Back
                        </Button>
                    </div>
                    <div className="flex-1">
                        <Button
                            size={'xl'}
                            className="w-full font-medium text-base"
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
