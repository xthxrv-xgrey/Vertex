import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../features/auth/useUser";
import { toast } from "sonner";

const EditProfileModal = ({ defaultData, setEditing }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            bio: "",
            github: "",
            linkedin: "",
            website: "",
        },
    });

    useEffect(() => {
        if (defaultData) {
            reset({
                firstName: defaultData.firstName || "",
                lastName: defaultData.lastName || "",
                username: defaultData.username || "",
                email: defaultData.email || "",
                bio: defaultData.bio || "",
                github: defaultData.github || "",
                linkedin: defaultData.linkedin || "",
                website: defaultData.website || "",
            });
        }
    }, [defaultData, reset]);

    const { updateUser } = useUser();

    const formSubmit = (data) => {
        updateUser(data);
        toast.success("User Updated!");
        reset();
        setEditing(false);
    };

    return (
        <form onSubmit={handleSubmit(formSubmit)} className="mt-6 space-y-5">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium">First Name</label>
                    <input
                        {...register("firstName", {
                            required: "First name is required",
                        })}
                        className="w-full mt-1 rounded-lg border border-border bg-background px-3 py-2"
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                </div>

                <div>
                    <label className="text-sm font-medium">Last Name</label>
                    <input
                        {...register("lastName")}
                        className="w-full mt-1 rounded-lg border border-border bg-background px-3 py-2"
                    />
                </div>
            </div>

            <div>
                <label className="text-sm font-medium">Bio</label>
                <textarea
                    rows={4}
                    {...register("bio")}
                    className="w-full mt-1 rounded-lg border border-border bg-background px-3 py-2 resize-none"
                />
            </div>

            <div>
                <label className="text-sm font-medium">Profile Url</label>
                <input
                    {...register("avatar")}
                    placeholder="https://porfile/url"
                    className="w-full mt-1 rounded-lg border border-border bg-background px-3 py-2"
                />
            </div>

            <div>
                <label className="text-sm font-medium">GitHub</label>
                <input
                    {...register("github")}
                    placeholder="https://github.com/username"
                    className="w-full mt-1 rounded-lg border border-border bg-background px-3 py-2"
                />
            </div>

            <div>
                <label className="text-sm font-medium">LinkedIn</label>
                <input
                    {...register("linkedin")}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full mt-1 rounded-lg border border-border bg-background px-3 py-2"
                />
            </div>

            <div>
                <label className="text-sm font-medium">Website</label>
                <input
                    {...register("website")}
                    placeholder="https://example.com"
                    className="w-full mt-1 rounded-lg border border-border bg-background px-3 py-2"
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-primary py-2 text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
                Save Changes
            </button>
        </form>
    );
};

export default EditProfileModal;
