import Session from "../services/session";

class Candidate {

    private name: string | null = "";
    private votes: number | string = "";

    public setName = (name: string) => {
        this.name = name;
        return this;
    }

    public setVotes = (votes: string | number) => {
        this.votes = typeof votes == "string" ? parseInt(votes) : votes;
        return this;
    }

    public getData = () => {
        return {
            name: this.name,
            votes: this.votes,
        }
    }

    public save = () => {
        let votes: any = Session.get("votes");
        let data: any = this.getData();
        if (votes == null) {
            votes = [data];
        } else {
            votes.push(data);
        }
        Session.put({
            votes: votes,
        });
        return this;
    }

}

export default Candidate