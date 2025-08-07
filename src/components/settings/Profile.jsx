import React, { useState, useRef } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button } from "@mantine/core";
import EditIcon from "../../assets/icons/editicon";

export const Profile = () => {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validate: {
      firstName: (value) =>
        value.trim().length > 0 ? null : "First Name is required",
      lastName: (value) =>
        value.trim().length > 0 ? null : "Last Name is required",
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : "Please enter a valid email",
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
    <div className="md:px-[30px] py-7 lg:w-[53.403vw]">
      <h2 className="text-2xl font-medium mb-4.5">Profile</h2>

      <div className="rounded-full w-[140px] h-[140px] bg-[#C2E281] relative">
        <input
          type="file"
          id="profile-image"
          accept="image/*"
          onChange={handleImageChange}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer rounded-full"
          ref={fileInputRef}
        />
        {image ? (
          <img
            src={image}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            <EditIcon className="w-8 h-8 cursor-pointer" />
          </div>
        )}
        <EditIcon
          className="absolute bottom-[-10px] right-[-10px] m-2 cursor-pointer"
          onClick={() => fileInputRef.current.click()}
        />
      </div>

      <hr className="border-[#E7E7E7] my-6" />

      <form onSubmit={handleSubmit}>
        <div className="flex gap-3 flex-col md:flex-row">
          {/* First Name Input */}
          <div className="flex flex-col w-full mb-4">
            <div className="flex flex-col h-[80px] bg-[#F6F6F6] border border-[#E7E7E7] rounded-[18px] shadow-[0px_0px_20px_0px_#00000005] gap-[9px] p-3">
              <TextInput
                {...form.getInputProps("firstName")}
                id="firstName"
                label="First Name"
                placeholder="John"
                error={form.errors.firstName}
                unstyled
                classNames={{
                  input:
                    "w-full border-none outline-none focus:ring-0 focus:border-none",
                }}
              />
            </div>
          </div>

          {/* Last Name Input */}
          <div className="flex flex-col w-full mb-4">
            <div className="flex flex-col h-[80px] bg-[#F6F6F6] border border-[#E7E7E7] rounded-[18px] shadow-[0px_0px_20px_0px_#00000005] gap-[9px] p-3">
              <TextInput
                {...form.getInputProps("lastName")}
                id="lastName"
                label="Last Name"
                placeholder="Doe"
                error={form.errors.lastName}
                unstyled
                classNames={{
                  input:
                    "w-full border-none outline-none focus:ring-0 focus:border-none",
                }}
              />

            </div>
          </div>
        </div>

        {/* Email Input */}
        <div className="flex flex-col mb-4">
          <div className="flex flex-col h-[80px] bg-[#F6F6F6] border border-[#E7E7E7] rounded-[18px] shadow-[0px_0px_20px_0px_#00000005] gap-[9px] p-3">
            <TextInput
              {...form.getInputProps("email")}
              id="email"
              label="Email Address"
              placeholder="example@mail.com"
              error={form.errors.email}
              unstyled
              classNames={{
                input:
                  "w-full border-none outline-none focus:ring-0 focus:border-none",
              }}
            />
          </div>
        </div>

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
