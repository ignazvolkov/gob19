class Session {

    static has = (key: string) => {
        let value = localStorage.getItem(key);
        if (value != null) {
            return true;
        }
        return false;
    }

    static get = (key: string) => {
        let data: any = localStorage.getItem(key);
        data = JSON.parse(data);
        if (Session.has("_flash_")) {
            let flash: any = localStorage.getItem("_flash_");
            flash = JSON.parse(flash);
            if (flash != null) {
                let position: number = flash.indexOf(key);
                if (position >= 0) {
                    Session.forget(key);
                    flash.splice(position, 1);
                    Session.put({
                        _flash_: flash
                    });
                }
            }
        }
        return data;
    }

    static pull = (key: string) => {
        let data: any = Session.get(key);
        if (data != null) {
            Session.forget(key);
        }
        return data;
    }

    static put = (data: object) => {
        let buffer: any = Object.entries(data);
        buffer.map((item: any) => {
            let key: string = item[0];
            let value: any = item[1];
            localStorage.setItem(key, JSON.stringify(value));
        });
    }

    static flash = (data: object) => {
        Session.put(data);
        let keys: any = Object.keys(data);
        let flash: any = Session.get("_flash_");
        if (flash == null) {
            flash = [];
        }
        keys.map((key: string) => {
            if (flash.indexOf(key) < 0)
                flash.push(key);
        });
        Session.put({
            _flash_: flash
        });
    }

    static keep = (key: string) => {
        let flash = Session.get("_flash_");
        if (flash == null) {
            flash = [];
        }
        let position = flash.indexOf(key);
        if (position >= 0) {
            flash.splice(position, 1);
            Session.put({
                _flash_: flash
            });
        }
    }

    static reflash = (key: string) => {
        let exists: boolean = Session.has(key);
        if (exists) {
            let flash: any = Session.get("_flash_");
            if (flash == null) {
                flash = [];
            }
            flash.push(key);
            Session.put({
                _flash_: flash
            });
        }
    }

    static forget = (key: string) => {
        localStorage.removeItem(key);
    }

    static purge = () => {
        localStorage.clear();
    }

}

export default Session;