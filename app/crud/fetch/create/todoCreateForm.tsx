"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useLoadingStore from "@/stores/useLoadingStore";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/shadcn_components/hook-form/form_input";
import { FormTextarea } from "@/components/shadcn_components/hook-form/textare";

const MAX_STR_LENGTH: number = 10000;
export const TodoSchema = z.object({
    title: z.string().min(1, {
        message: "title must be at least 1 characters."
    }),
    content: z.string().min(1, {
        message: "content must be at least 1 characters."
    })
});

export default function TodoCreateForm() {
    const router = useRouter();
    const { setLoading } = useLoadingStore();

    const form = useForm<z.infer<typeof TodoSchema>>({
        resolver: zodResolver(TodoSchema),
        defaultValues: {
            title: "",
            content: ""
        }
    });
    const { control, handleSubmit, setError, watch } = form;
    const formData = watch();

    const onSubmit = async (values: z.infer<typeof TodoSchema>) => {
        setLoading(true);
        const formData = {
            ...values
        };
        try {
            const res = await fetch("/_api/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.status >= 400) {
                throw new Error(`${res.status} \n ${res.statusText}`);
                console.log(res);
            }
            router.push("/crud/fetch");
            router.refresh();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="font-bold text-2xl mb-4">Todo Create</h1>
            <div className="bg-white">
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <FormInput control={control} name={"title"} placeholder={"入力してください"} label={"タイトル"} inputCss={"w-1/3"} disabled={false} />

                        <FormTextarea
                            control={control}
                            name={"content"}
                            placeholder={"入力してください"}
                            maxStrLength={MAX_STR_LENGTH}
                            label={"内容"}
                            textareaFieldCss="w-full"
                            textareaCss="resize"
                            readOnly={false}
                            isHideStrLength={false}
                            rows={10}
                        />

                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </>
    );
}
