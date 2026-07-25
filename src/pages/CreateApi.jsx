import React from "react";
import { Link, useNavigate } from "react-router";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";

import { useApis } from "../features/api/useApi.js";

const CreateApi = () => {
    const navigate = useNavigate();
    const { createApi } = useApis();

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: "",
            description: "",
            method: "GET",
            visibility: "public",
            status: "active",
            url: "",
            baseUrl: "",
            headers: [
                {
                    key: "Accept",
                    value: "application/json",
                },
            ],
            requestBody: "",
            responseBody: "",
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "headers",
    });

    const onSubmit = (data) => {
        console.log("SUBMIT FIRED", data);
        const headers = {};

        data.headers.forEach((header) => {
            if (header.key.trim()) {
                headers[header.key] = header.value;
            }
        });

        createApi({
            ...data,
            headers,
        });
        reset();
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-5xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="mb-10">
                    <Link to="/" className="inline-block mb-8">
                        <h1 className="font-logo text-4xl font-bold">Vertex</h1>
                    </Link>

                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-3 bg-secondary rounded-full px-4 py-2">
                            <div className="w-2 h-2 rounded-full bg-ring"></div>

                            <p className="text-xs text-muted-foreground">Document your API beautifully</p>
                        </div>

                        <h2 className="font-logo text-5xl">Create API</h2>

                        <p className="text-muted-foreground max-w-2xl leading-7">
                            Publish clean, consistent API documentation for your team or the community.
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="border border-border rounded-2xl bg-card p-8 space-y-8"
                >
                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title *</label>

                        <input
                            {...register("title", {
                                required: "Title is required",
                            })}
                            placeholder="User Authentication API"
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
                        />

                        {errors.title && <p className="text-destructive text-sm">{errors.title.message}</p>}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>

                        <textarea
                            rows={4}
                            {...register("description")}
                            placeholder="Describe your API..."
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-ring"
                        />
                    </div>

                    {/* Selects */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Method</label>

                            <select
                                {...register("method")}
                                className="w-full rounded-xl border border-border bg-background px-4 py-3"
                            >
                                <option>GET</option>
                                <option>POST</option>
                                <option>PUT</option>
                                <option>PATCH</option>
                                <option>DELETE</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Visibility</label>

                            <select
                                {...register("visibility")}
                                className="w-full rounded-xl border border-border bg-background px-4 py-3"
                            >
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Status</label>

                            <select
                                {...register("status")}
                                className="w-full rounded-xl border border-border bg-background px-4 py-3"
                            >
                                <option value="active">Active</option>
                                <option value="deprecated">Deprecated</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>
                    </div>

                    {/* URL */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Endpoint URL *</label>

                        <input
                            {...register("url", {
                                required: "URL is required",
                            })}
                            placeholder="https://example.com/api/login"
                            className="w-full rounded-xl border border-border bg-background px-4 py-3"
                        />

                        {errors.url && <p className="text-destructive text-sm">{errors.url.message}</p>}
                    </div>

                    {/* Base URL */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Base URL</label>

                        <input
                            {...register("baseUrl")}
                            placeholder="https://example.com"
                            className="w-full rounded-xl border border-border bg-background px-4 py-3"
                        />
                    </div>

                    {/* Headers */}
                    <div className="space-y-5">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold">Headers</h3>

                            <button
                                type="button"
                                onClick={() =>
                                    append({
                                        key: "",
                                        value: "",
                                    })
                                }
                                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-secondary transition"
                            >
                                <Plus size={16} />
                                Add Header
                            </button>
                        </div>

                        <div className="space-y-3">
                            {fields.map((field, index) => (
                                <div key={field.id} className="grid md:grid-cols-[1fr_1fr_auto] gap-3">
                                    <input
                                        {...register(`headers.${index}.key`)}
                                        placeholder="Header"
                                        className="rounded-xl border border-border bg-background px-4 py-3"
                                    />

                                    <input
                                        {...register(`headers.${index}.value`)}
                                        placeholder="Value"
                                        className="rounded-xl border border-border bg-background px-4 py-3"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="rounded-xl border border-border px-4 hover:bg-destructive/10"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Request */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Request Body</label>

                        <textarea
                            rows={10}
                            {...register("requestBody")}
                            placeholder={`{
    "email": "",
    "password": ""
}`}
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 font-mono text-sm resize-none"
                        />
                    </div>

                    {/* Response */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Response Body</label>

                        <textarea
                            rows={10}
                            {...register("responseBody")}
                            placeholder={`{
    "token": "...",
    "user": {}
}`}
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 font-mono text-sm resize-none"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col-reverse md:flex-row justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-6 py-3 rounded-xl border border-border hover:bg-secondary transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-8 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition"
                        >
                            Create API
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateApi;
