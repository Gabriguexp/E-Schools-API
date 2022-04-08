export const home = async (req, res) => {
    try {
        const dato = req.body.dato;
        res.status(200).json({message: dato})

        /*
        console.log('ha entrado en el home')
    
        let response = {
            o1 : {
                i1_1: "a"
            },
            i1: "a"
        }
        res.json(response)
        */    
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}

export const login = async (req, res) => {
    try {
        const dato = req.body.dato;
        res.status(200).json({message: dato})

        /*
        console.log('ha entrado en el home')
    
        let response = {
            o1 : {
                i1_1: "a"
            },
            i1: "a"
        }
        res.json(response)
        */    
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}

