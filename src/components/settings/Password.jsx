import React from "react";
import { useForm } from "@mantine/form";
import { PasswordInput, Button } from "@mantine/core";
export const Password = () => {
  const form = useForm({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validate: {
      currentPassword: (value) =>
        value.trim().length > 0 ? null : "Current Password is required",
      newPassword: (value) =>
        value.trim().length > 0
          ? value.length >= 8 && /[A-Z]/.test(value)
            ? null
            : "New Password must be at least 8 characters long and contain at least one uppercase letter"
          : "New Password is required",
      confirmPassword: (value, values) =>
        value === values.newPassword
          ? null
          : "Confirm Password must match New Password",
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = form.validate();
    if (validation.hasErrors) {
      console.log("Form has errors!");
    } else {
      console.log(form.values);
    }
  };
  return (
    <div className="md:px-[30px] py-7">
      <h2 className="text-2xl font-medium mb-4.5">Password</h2>
      <p className="text-base mb-6 text-[#5E5E5E] dark:text-[#A1A1A1]">
        Please enter your current password to change your password.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3 flex-col md:flex-row mb-4">
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center">
              <span className="text-[#272727] dark:text-[#E7E7E7] w-full md:w-[280px]">
                Current Password
              </span>
              <div className="flex justify-center flex-1 flex-col h-[70px] bg-[#F6F6F6] dark:bg-[#17191C] border border-[#E7E7E7] rounded-[18px] shadow-[0px_0px_20px_0px_#00000005] gap-[9px] p-3">
                <PasswordInput
                  {...form.getInputProps("currentPassword")}
                  placeholder="********"
                  error={form.errors.currentPassword}
                  classNames={{
                    input:
                      "w-full border-none outline-none focus:ring-0 focus:border-none",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="border-[#E7E7E7] dark:border-[#222222] my-4.5" />
        <div className="flex gap-3 flex-col md:flex-row mb-4">
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center">
              <span className="text-[#272727] dark:text-[#E7E7E7] w-full md:w-[280px]">
                New Password
              </span>
              <div className="flex justify-center flex-1 flex-col h-[70px] bg-[#F6F6F6] dark:bg-[#17191C] border border-[#E7E7E7] rounded-[18px] shadow-[0px_0px_20px_0px_#00000005] gap-[9px] p-3">
                <PasswordInput
                  {...form.getInputProps("newPassword")}
                  placeholder="********"
                  error={form.errors.newPassword}
                  classNames={{
                    input:
                      "w-full border-none outline-none focus:ring-0 focus:border-none",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="border-[#E7E7E7] dark:border-[#222222] my-4.5" />

        <div className="flex gap-3 flex-col md:flex-row mb-4">
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center">
              <span className="text-[#272727] dark:text-[#E7E7E7] w-full md:w-[280px]">
                Confirm New Password
              </span>
              <div className="flex justify-center flex-1 flex-col h-[70px] bg-[#F6F6F6] dark:bg-[#17191C] border border-[#E7E7E7] rounded-[18px] shadow-[0px_0px_20px_0px_#00000005] gap-[9px] p-3">
                <PasswordInput
                  {...form.getInputProps("confirmPassword")}
                  placeholder="********"
                  error={form.errors.confirmPassword}
                  classNames={{
                    input:
                      "w-full border-none outline-none focus:ring-0 focus:border-none",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        <Button
          unstyled
          type="submit"
          className="py-4 px-6 bg-[#D2F159] rounded-[18px] text-[#272727] font-medium mt-10 cursor-pointer"
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
};
