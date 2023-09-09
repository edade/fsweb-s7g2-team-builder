import logo from "./logo.svg";
import "./App.css";
import Members from "./Components/Members";
import Form from "./Components/Form";
import { Route, Switch, NavLink, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import * as Yup from "yup";

function App() {
  const membersInitial = [
    {
      id: 1,
      img: "https://picsum.photos/200/300",
      name: "Eda Kalaycıoğlu",
      email: "eda@workintech.com",
      rol: "full-stack dev.",
      terms: true,
    },

    {
      id: 2,
      img: "https://picsum.photos/200/300",
      name: "Duygu K.",
      email: "duygu@workintech.com",
      rol: "Manager",
      terms: true,
    },
  ];
  const formDataInitials = {
    name: "",
    email: "",
    rol: "",
    terms: false,
  };

  const [formData, setFormData] = useState(formDataInitials);
  const [members, setMembers] = useState(membersInitial);
  const [isValid, setValid] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    rol: "",
    terms: "",
  });

  const history = useHistory();
  const submitHandler = (e) => {
    e.preventDefault();
    if (formData.id) {
      let updatedMember = members.map((member) => {
        if (member.id == formData.id) {
          return formData;
        } else {
          return member;
        }
      });
      setMembers(updatedMember);
    } else {
      const newMember = {
        ...formData,
        ["img"]: "https://picsum.photos/200/300",
        ["id"]: members[members.length - 1].id + 1,
      };
      setMembers([...members, newMember]);
    }

    setFormData(formDataInitials);
    history.push("/");
  };
  const changeHandler = (e) => {
    let { value, type, name, checked } = e.target;
    value = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: value });
    Yup.reach(membersFormSchema, name)
      .validate(value)
      .then((res) => setErrors({ ...errors, [name]: "" }))
      .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
  };
  const membersFormSchema = Yup.object().shape({
    name: Yup.string()
      .required("İsim giriniz.")
      .min(3, "en az 3 karakter olmalı"),
    email: Yup.string().required("giriniz").email("Geçerli bir email giriniz!"),
    rol: Yup.string().required("Görevi giriniz"),
    terms: Yup.boolean().oneOf([true], "Şartları kabul ediniz"),
  });

  const editMember = (member) => {
    setFormData(member);
    history.push("/signup");
  };
  useEffect(() => {
    membersFormSchema.isValid(formData).then((valid) => setValid(valid));
  }, [formData]);
  return (
    <div>
      <header>
        <nav className="d-flex gap-5 p-3">
          <NavLink
            to="/"
            exact
            style={{
              margin: "3em",
            }}
          >
            Home
          </NavLink>
          <NavLink to="/signup" exact>
            New Member
          </NavLink>
        </nav>
      </header>
      <Switch>
        <Route path="/" exact>
          <Members members={members} editMember={editMember} />
        </Route>

        <Route path="/signup" exact>
          <Form
            membersFormSchema={membersFormSchema}
            submitHandler={submitHandler}
            changeHandler={changeHandler}
            formData={formData}
            isValid={isValid}
            errors={errors}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
