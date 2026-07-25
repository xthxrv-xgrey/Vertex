import { Link, useNavigate, useParams } from "react-router";
import { Pencil, Trash2, Bookmark, BookmarkCheck } from "lucide-react";

import { useApis } from "../features/api/useApi";
import { useAuth } from "../features/auth/useAuth";

const methodColors = {
    GET: "bg-method-get/10 text-method-get border-method-get/20",
    POST: "bg-method-post/10 text-method-post border-method-post/20",
    PUT: "bg-method-put/10 text-method-put border-method-put/20",
    PATCH: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    DELETE: "bg-method-delete/10 text-method-delete border-method-delete/20",
};

const InfoRow = ({ title, value }) => (
    <div className="flex items-center justify-between border-b border-border px-6 py-4 last:border-none">
        <span className="text-sm text-muted-foreground">{title}</span>
        <span className="text-right font-medium break-all">{value}</span>
    </div>
);

const ApiPage = () => {
    const { apiId } = useParams();
    const navigate = useNavigate();

    const { getApiById, isUsersApi, deleteApi, isApiSaved, saveApi, unsaveApi } = useApis();
    const { currentUser } = useAuth();

    const api = getApiById(apiId);

    if (!api) {
        return (
            <div className="flex min-h-[80vh] items-center justify-center">
                <h1 className="text-4xl font-bold text-muted-foreground">API does not exist.</h1>
            </div>
        );
    }

    const isOwner = currentUser && isUsersApi(apiId);
    const isSaved = isApiSaved(apiId);

    const handleDelete = () => {
        const confirmed = window.confirm("Are you sure you want to delete this API?");

        if (!confirmed) return;

        deleteApi(apiId);
        navigate("/dashboard");
    };

    return (
        <div className="mx-auto max-w-6xl space-y-8 py-10">
            {/* Header */}
            <section className="space-y-6 border-b border-border pb-8">
                <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
                    <div className="space-y-4">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight">{api.title}</h1>

                            <p className="mt-3 max-w-3xl text-muted-foreground">
                                {api.description || "No description provided."}
                            </p>
                        </div>

                        <div className="flex gap-3">
                            {isOwner ? (
                                <>
                                    <Link
                                        to={`/editApi/${api.id}`}
                                        className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 hover:bg-accent"
                                    >
                                        <Pencil size={18} />
                                        Edit
                                    </Link>

                                    <button
                                        onClick={handleDelete}
                                        className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-white hover:bg-red-700"
                                    >
                                        <Trash2 size={18} />
                                        Delete
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => (isSaved ? unsaveApi(api.id) : saveApi(api.id))}
                                    className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 hover:bg-accent"
                                >
                                    {isSaved ? (
                                        <>
                                            <BookmarkCheck size={18} />
                                            Saved
                                        </>
                                    ) : (
                                        <>
                                            <Bookmark size={18} />
                                            Save
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-border bg-muted/40 p-4">
                    <code className="font-mono text-sm">{api.url}</code>
                </div>
            </section>

            {/* Information */}
            <section className="overflow-hidden rounded-2xl border border-border bg-card">
                <div className="border-b border-border px-6 py-4">
                    <h2 className="text-lg font-semibold">Request Information</h2>
                </div>

                <div className="grid md:grid-cols-2">
                    <InfoRow title="Status" value={api.status.charAt(0).toUpperCase() + api.status.slice(1)} />
                    <InfoRow
                        title="Visibility"
                        value={api.visibility.charAt(0).toUpperCase() + api.visibility.slice(1)}
                    />
                    <InfoRow title="Owner" value={api.owner} />
                    <InfoRow title="Base URL" value={api.baseUrl || "Not specified"} />
                    <InfoRow title="Created" value={new Date(api.createdAt).toLocaleString()} />
                    <InfoRow title="Updated" value={new Date(api.updatedAt).toLocaleString()} />
                </div>
            </section>

            {/* Headers */}
            <section className="overflow-hidden rounded-2xl border border-border bg-card">
                <div className="border-b border-border px-6 py-4">
                    <h2 className="text-lg font-semibold">Headers</h2>
                </div>

                {api.headers && Object.keys(api.headers).length > 0 ? (
                    <div className="divide-y divide-border">
                        {Object.entries(api.headers).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between gap-6 px-6 py-4">
                                <span className="font-medium">{key}</span>

                                <code className="break-all text-sm text-muted-foreground">{value}</code>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="px-6 py-8 text-muted-foreground">No headers provided.</div>
                )}
            </section>

            {/* Request Body */}
            <section className="overflow-hidden rounded-2xl border border-border bg-card">
                <div className="border-b border-border px-6 py-4">
                    <h2 className="text-lg font-semibold">Request Body</h2>
                </div>

                <pre className="overflow-x-auto p-6 font-mono text-sm">{api.requestBody || "No request body."}</pre>
            </section>

            {/* Response Body */}
            <section className="overflow-hidden rounded-2xl border border-border bg-card">
                <div className="border-b border-border px-6 py-4">
                    <h2 className="text-lg font-semibold">Response Body</h2>
                </div>

                <pre className="overflow-x-auto p-6 font-mono text-sm">
                    {api.responseBody || "No response example."}
                </pre>
            </section>
        </div>
    );
};

export default ApiPage;
