import { useEffect, useState } from "react";
import client, { COLLECTION_ID_MESSAGES, DATABASE_ID, databases } from "../appwriteConfig";
import { ID, Permission, Query, Role } from "appwrite";
import { Trash2 } from "react-feather";
import { Header } from "../components/Header";
import { useAuth } from "../utils/AuthContext";


export function Room() {
    const [messages, setMessages] = useState([]);
    const [messageBody, setMessageBody] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        getMessages();
        const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`, (response) => {
            if (response.events.includes("databases.*.collections.*.documents.*.create")) {
                console.log("::: a msg was created.");
                setMessages(prevMessges => [response.payload, ...prevMessges]);
            }
            if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
                console.log("::: a msg was deleted!!!");
                setMessages(prevMessages => prevMessages.filter(msg => msg.$id !== response.payload.$id));
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            user_id: user.$id,
            username: user.name,
            body: messageBody,
        };

        const permissions = [
            Permission.write(Role.user(user.$id)),
        ];

        let response = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
            ID.unique(),
            payload,
            permissions
        );

        // console.log(":: :: ", response);
        setMessageBody("");
    };

    const getMessages = async () => {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
            [
                Query.orderDesc("$createdAt"),
                Query.limit(5)
            ]
        );
        setMessages(response.documents);

        // console.log(":::: list  ", response);
    };

    const deleteMessage = async (message_id) => {
        const response = await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, message_id);
        // console.log(":::: delete  ", response);
    };

    return (
        <main className="container">
            <Header />
            <div className="room--container">

                <form onSubmit={handleSubmit} id="message--form">
                    <textarea
                        required
                        maxLength="1000"
                        placeholder="Say something..."
                        value={messageBody}
                        onChange={e => setMessageBody(e.target.value)}
                    ></textarea>

                    <div className="send-btn--wrapper">
                        <input className="btn btn--secondary " type="submit" value="Send" />
                    </div>
                </form>

                <div>
                    {messages.map(message => (
                        <div key={message.$id} className="message--wrapper">
                            <div className="message--header">
                                <p>
                                    {message?.username ? (
                                        <span>{message.username}</span>
                                    ) : (
                                        <span>Anonymous user</span>
                                    )}

                                    <small className="message-timestamp">{new Date(message.$createdAt).toLocaleString()}</small>
                                </p>

                                {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && (
                                    <Trash2
                                        className="delete--btn"
                                        onClick={() => deleteMessage(message.$id)}
                                    />
                                )}

                            </div>
                            <div className="message--body">
                                <span>{message.body}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}