import { db} from "../../db";
import {committee} from "../../db/schema";
export default async function CommitteePage(){
    const allMembers=await db.select().from(committee);
        return (
            <div>
                <h1>Committee</h1>
                <ul>
                    {allMembers.map((member) => (
                        <li key={member.id}>
                            <img src={member.photoUrl ?? ""} alt={member.name} />
                            <h2>{member.name}</h2>
                            <p>{member.role}</p>
                            <a href={member.linkedin ?? "#"}>LinkedIn</a>
                        </li>
                    ))}
                </ul>
            </div>
        );
}