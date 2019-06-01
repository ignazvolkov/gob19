import Session from "./session";
import Paths from "./paths";

var Database = require("../mocks/users");

class Auth {

    login = (username: string, password: string, callback: any) => {
        let login: any = {
            username: username,
            password: password,
        }
        callback(this.checkAccount(login));
    }

    checkToken = () => {
        let token: any = Session.has("token");
        let username: any = Session.has("username");
        if (token != null && !username != null) {
            let login: any = {
                username: Session.get("username"),
                token: Session.get("token"),
            }
            return this.checkAccount(login);
        }
        return false;
    }

    checkAccount = (login: any) => {
        let found: boolean = false;
        Database.map((account: any) => {
            if (account.username == login.username) {
                let check: any = {
                    in: login.token != null ? login.token : login.password,
                    db: login.token != null ? account.token : account.password,
                }
                if (check.in == check.db) {
                    Session.put(account);
                    Session.forget("password");
                    found = true;
                }
            }
        });
        return found;
    }

    redirect = () => {
        let username: boolean = Session.has("username");
        let token: boolean = Session.has("token");
        if (username && token) {
            location.href = Paths.votes;
        }
    }

}

export default Auth;