import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";

import { useApis } from "../features/api/useApi.js";
import { useAuth } from "../features/auth/useAuth.js";

const EditApi = () => {
    const { apiId } = useParams();
    const navigate = useNavigate();

    const { getApiById, editApi } = useApis();
    const { currentUser } = useAuth();

    const api = getApiById(apiId);

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

    useEffect(() => {
        if (!api) return;

        reset({
            ...api,
            headers: Object.entries(api.headers ?? {}).map(([key, value]) => ({
                key,
                value,
            })),
        });
    }, [api, reset]);

    if (!api) {
        return <div>API not found.</div>;
    }

    if (api.owner !== currentUser) {
        return <div>This API does not belong to you.</div>;
    }

    const onSubmit = (data) => {
        const headers = {};

        data.headers.forEach((header) => {
            if (header.key.trim()) {
                headers[header.key] = header.value;
            }
        });

        editApi({
            ...api,
            ...data,
            headers,
        });

        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-4xl mx-auto px-5 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link to="/" className="inline-block mb-5">
                        <h1 className="font-logo text-4xl font-bold">Vertex</h1>
                    </Link>

                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 bg-secondary rounded-full px-3 py-1.5">
                            <div className="w-2 h-2 rounded-full bg-ring" />

                            <p className="text-xs text-muted-foreground">Update your API documentation</p>
                        </div>

                        <h2 className="font-logo text-4xl">Edit API</h2>

                        <p className="text-muted-foreground max-w-xl leading-6 text-sm">
                            Update your API documentation.
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="border border-border rounded-2xl bg-card p-6 space-y-6"
                >
                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title *</label>

                        <input
                            {...register("title", {
                                required: "Title is required",
                            })}
                            placeholder="User Authentication API"
                            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 outline-none focus:ring-2 focus:ring-ring"
                        />

                        {errors.title && <p className="text-destructive text-sm">{errors.title.message}</p>}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>

                        <textarea
                            rows={3}
                            {...register("description")}
                            placeholder="Describe your API..."
                            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 resize-none outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>

                    {/* Selects */}
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Method</label>

                            <select
                                {...register("method")}
                                className="w-full rounded-xl border border-border bg-background px-4 py-2.5"
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
                                className="w-full rounded-xl border border-border bg-background px-4 py-2.5"
                            >
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Status</label>

                            <select
                                {...register("status")}
                                className="w-full rounded-xl border border-border bg-background px-4 py-2.5"
                            >
                                <option value="active">Active</option>
                                <option value="deprecated">Deprecated</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>
                    </div>

                    {/* Endpoint URL */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Endpoint URL *</label>

                        <input
                            {...register("url", {
                                required: "URL is required",
                            })}
                            placeholder="https://example.com/api/login"
                            className="w-full rounded-xl border border-border bg-background px-4 py-2.5"
                        />

                        {errors.url && <p className="text-destructive text-sm">{errors.url.message}</p>}
                    </div>

                    {/* Base URL */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Base URL</label>

                        <input
                            {...register("baseUrl")}
                            placeholder="https://example.com"
                            className="w-full rounded-xl border border-border bg-background px-4 py-2.5"
                        />
                    </div>

                    {/* Headers */}
                    <div className="space-y-4">
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
                                className="flex items-center gap-2 rounded-xl border border-border px-3 py-2 hover:bg-secondary transition"
                            >
                                <Plus size={16} />
                                Add Header
                            </button>
                        </div>

                        <div className="space-y-2">
                            {fields.map((field, index) => (
                                <div key={field.id} className="grid md:grid-cols-[1fr_1fr_auto] gap-3">
                                    <input
                                        {...register(`headers.${index}.key`)}
                                        placeholder="Header"
                                        className="rounded-xl border border-border bg-background px-4 py-2.5"
                                    />

                                    <input
                                        {...register(`headers.${index}.value`)}
                                        placeholder="Value"
                                        className="rounded-xl border border-border bg-background px-4 py-2.5"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="rounded-xl border border-border px-3 hover:bg-destructive/10 transition"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Request Body */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Request Body</label>

                        <textarea
                            rows={6}
                            {...register("requestBody")}
                            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 font-mono text-sm resize-none"
                        />
                    </div>

                    {/* Response Body */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Response Body</label>

                        <textarea
                            rows={6}
                            {...register("responseBody")}
                            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 font-mono text-sm resize-none"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col-reverse md:flex-row justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="rounded-xl border border-border px-5 py-2.5 hover:bg-secondary transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-xl bg-primary px-6 py-2.5 text-primary-foreground hover:opacity-90 transition"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditApi;
