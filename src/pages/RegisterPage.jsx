import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useState } from "react";
import { formatISODate } from "../utils/dateFormatter";
import {
  calculateDueDate,
  calculatePregnancyWeek,
  getDueDateCountdown,
} from "../utils/userCalculation";
import { storeProfile } from "../redux/slices/profileSlice";
import { useDispatch } from "react-redux";

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    password: "",
    namaLengkap: "",
    umur: null,
    umurKehamilan: null,
  });

  const handleRegister = () => {
    const today = formatISODate(new Date());
    const dueDate = calculateDueDate(today, form.umurKehamilan);

    const payload = {
      email: form.email,
      password: form.password,
      name: form.namaLengkap,
      motherAge: form.umur,
      registeredWeek: form.umurKehamilan,
      registeredDate: today,
      currentWeek: calculatePregnancyWeek(form.umurKehamilan, today),
      dueDate,
      dueDateCountDown: getDueDateCountdown(dueDate),
      streak: 0,
      lastCheckupDate: today,
    };

    dispatch(storeProfile(payload));
    navigate("/");
  };

  return (
    <div className="screen flex flex-col items-center gap-6 justify-center">
      <div className="neutral flex flex-col items-center gap-1">
        <h1 className="text-5xl logo">BundaSehat</h1>
        <p className="c paragraph">Pendamping kehamilan sehat setiap hari</p>
        <img src="/hackherthon-bundasehat/logo.svg" alt="logo" className="my-3" />
        <p className="p1 paragraph">Silahkan mendaftar terlebih dahulu!</p>
      </div>

      <div className="w-full flex flex-col items-center gap-8">
        <div className="w-full flex flex-col gap-5">
          <InputField
            label={"Email"}
            type={"email"}
            placeholder={"Masukan email yang aktif ya"}
            form={form}
            setForm={setForm}
          ></InputField>
          <InputField
            label={"Password"}
            type={"password"}
            placeholder={"*****"}
            form={form}
            setForm={setForm}
          ></InputField>
          <InputField
            label={"Nama Lengkap"}
            type={"text"}
            placeholder={"Tulis nama lengkap kamu disini"}
            form={form}
            setForm={setForm}
          ></InputField>
          <InputField
            label={"Umur"}
            type={"number"}
            placeholder={"Berapa umur kamu saat ini?"}
            form={form}
            setForm={setForm}
          ></InputField>
          <InputField
            label={"Umur Kehamilan"}
            type={"number"}
            placeholder={"Masukan usia kehamilan dalam minggu"}
            form={form}
            setForm={setForm}
          ></InputField>
        </div>

        <Button text={"Daftar Sekarang"} onClick={handleRegister}></Button>
      </div>
    </div>
  );
}

export default RegisterPage;
