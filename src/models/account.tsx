import Auth from "../services/auth";
import Trans from "../services/trans";
import Session from "../services/session";

class Account {

    static OFFLINE_STATE: number = 0;
    static CONNECTED_STATE: number = 1;

    static UNKNOWN_ROLE: number = 0;
    static ADMIN_ROLE: number = 1;
    static GUEST_ROLE: number = 2;

    static ROLE_NAMES: any = {
        0: {
            key: Account.UNKNOWN_ROLE,
            code: "unknown",
            human: "Desconocido",
        },
        1: {
            key: Account.ADMIN_ROLE,
            code: "admin",
            human: "Administrador",
        },
        2: {
            key: Account.GUEST_ROLE,
            code: "guest",
            human: "Invitado",
        },
    }

    private errors: any = [];
    private username: string | null = null;
    private password: string | null = null;
    private role: number = Account.UNKNOWN_ROLE;
    private state: number = Account.OFFLINE_STATE;
    
    private auth = new Auth();

    setUsername = (user: string) => {
        user = user.toLowerCase().trim();
        this.username = user == "" ? null : user;
        return this;
    }

    setPassword = (pass: string | null) => {
        pass = pass != null ? pass.trim() : null;
        this.password = pass == "" ? null : pass;
        return this;
    }

    setRole = (role: any) => {
        this.role = parseInt(role);
        return this;
    }

    setState = (state: any) => {
        this.state = state;
        return this;
    }

    isConnected = () => {
        let state = this.state;

        if (state == Account.CONNECTED_STATE) {
            return true;
        }

        return false;
    }

    setError = (message: string) => {
        this.errors.push(message);
        return this.errors;
    }

    getErrors = () => {
        let errors: any = this.errors;
        this.errors = [];
        return errors;
    }

    getRole = () => {
        let data: any = Account.ROLE_NAMES[this.role];
        return data;
    }

    connect = (callback: any) => {
        let auth = this.auth;
        let username = this.username;
        let password = this.password;

        if (username != null && username != "") {
            if (password != null && password != "") {
                let connection = auth.login(username, password, (response: any) => {
                    if (!response) {
                        this.setError(Trans.Login.invalidAccount);
                    } else {
                        this.setRole(Session.get("role"));
                        callback({
                            state: Account.CONNECTED_STATE,
                            role: this.getRole().code,
                        });
                        return true;
                    }
                });
            } else {
                this.setError(Trans.Login.emptyPassword);
            }
        } else {
            this.setError(Trans.Login.emptyUsername);
        }
        
        callback({
            state: Account.OFFLINE_STATE,
            errors: this.getErrors(),
        });
        return false;
    }

}

export default Account;