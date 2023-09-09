import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";

const Members = ({ members, editMember }) => {
  console.log(members);
  return (
    <div>
      {members.map((member) => (
        <Card
          style={{
            width: "50%",
            margin: "auto",
          }}
        >
          <img alt="Sample" src={member.img} />
          <CardBody>
            <CardTitle tag="h5">{member.name}</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              {member.rol}
            </CardSubtitle>
            <CardText>{member.email}</CardText>
            <Button onClick={() => editMember(member)}>Edit</Button>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};
export default Members;
