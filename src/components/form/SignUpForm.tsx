
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface RegisterProps {
  hidden?: string; 
}

interface FormData {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

const SignUpForm: React.FC<RegisterProps> = (props) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newFormData = {
      name: formData.name + " " + formData.lastName, 
      email: formData.email,
      password: formData.password,
      role: "USER",
    };

    console.log(newFormData);

    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFormData),
      });

      if (!response.ok) {
        throw new Error("Erro ao registrar o usuário");
      }

      console.log("User registered successfully");
      navigate("/home");
    } catch (error) {
      console.error("There was an error registering the user!", error);
    }
  };

  return (
    <div
      className={`bg-[#2A7C76] shadow-xl  w-3/12 h-[573px] flex flex-col justify-center items-center ${props.hidden} max-lg:bg-[#fff] max-lg:w-full max-lg:h-full `}
    >
      <h1 className="text-[#F7F6F6] font-semibold text-3xl  mb-[15px] mx-[auto] max-lg:text-[40px] max-lg:mb-[25px] max-lg:text-[#2A7C76]">
        Cadastro
      </h1>
      <form className="flex flex-col w-full max-lg:items-center " onSubmit={handleSubmit}>
      
        <input
          type="text"
          name="name"
          className="w-9/12 h-[46px] mx-[auto] mb-[15px] px-[20px] bg-[#F1F0F3] text-[#6C6A6A] font-regular border-solid border-2 border-[#6C6A6A]/[.6] hover:border-[#6C6A6A] focus:border-[#6C6A6A] outline-none rounded-lg placeholder:text-[#6C6A6A] placeholder:font-regular max-md:mx-[25px] max-lg:w-8/12 max-lg:bg-[#fff]"
          placeholder="Nome"
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          className="w-9/12 h-[46px] mx-[auto] mb-[15px] px-[20px] bg-[#F1F0F3] text-[#6C6A6A] font-regular border-solid border-2 border-[#6C6A6A]/[.6] hover:border-[#6C6A6A] focus:border-[#6C6A6A] outline-none rounded-lg placeholder:text-[#6C6A6A] placeholder:font-regular max-md:mx-[25px] max-lg:w-8/12 max-lg:bg-[#fff]"
          placeholder="Sobrenome"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          className="w-9/12 h-[46px] mx-[auto] mb-[15px] px-[20px] bg-[#F1F0F3] text-[#6C6A6A] font-regular border-solid border-2 border-[#6C6A6A]/[.6] hover:border-[#6C6A6A] focus:border-[#6C6A6A] outline-none rounded-lg placeholder:text-[#6C6A6A] placeholder:font-regular max-md:mx-[25px] max-lg:w-8/12 max-lg:bg-[#fff]"
          placeholder="E-mail"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          className="w-9/12 h-[46px] mx-[auto] mb-[15px] px-[20px] bg-[#F1F0F3] text-[#6C6A6A] font-regular border-solid border-2 border-[#6C6A6A]/[.6] hover:border-[#6C6A6A] focus:border-[#6C6A6A] outline-none rounded-lg placeholder:text-[#6C6A6A] placeholder:font-regular max-md:mx-[25px] max-lg:w-8/12 max-lg:bg-[#fff]"
          placeholder="Senha"
          onChange={handleChange}
        />
        <input
          type="submit"
          value="Cadastrar"
          className="w-9/12 h-[46px] mx-[auto] cursor-pointer	 bg-[#F1F0F3] text-[#2A7C76] text-[18px] font-semibold rounded-lg max-md:mx-[30px] max-lg:w-8/12 max-lg:bg-[#2A7C76] max-lg:text-[#fff]"
        />
      </form>
    </div>
  );
};

export default SignUpForm;