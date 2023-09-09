import logo from "./logo.svg";
import "./App.css";
import Members from "./Components/Members";
import Form from "./Components/Form";
import {
  BrowserRouter,
  Route,
  Switch,
  NavLink,
  useHistory,
} from "react-router-dom";
import { useState } from "react";

function App() {
  const membersInitial = [
    {
      id: 1,
      img: "https://picsum.photos/200/300",
      name: "Eda Kalaycıoğlu",
      email: "eda@workintech.com",
      rol: "full-stack dev.",
    },

    {
      id: 2,
      img: "https://picsum.photos/200/300",
      name: "Duygu K.",
      email: "duygu@workintech.com",
      rol: "Manager",
    },
  ];
  const formDataInitials = {
    name: "",
    email: "",
    rol: "",
  };

  const [formData, setFormData] = useState(formDataInitials);
  const [members, setMembers] = useState(membersInitial);

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

      updatedMember = { ...formData };
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
  };
  const editMember = (member) => {
    setFormData(member);
    history.push("/signup");
  };
  return (
    <div>
      <BrowserRouter>
        <header>
          <nav className="d-flex gap-5 p-3">
            <NavLink to="/" exact>
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
              submitHandler={submitHandler}
              changeHandler={changeHandler}
              formData={formData}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
