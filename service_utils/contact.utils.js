module.exports =  function parseConnections(connections, profileObj){
    let data = []
    
    connections.forEach((person) => {
        let personFields ={}
        personFields.ownerEmail = profileObj.email
        if (person.names && person.names.length > 0) {
            personFields.displayName = person.names[0].displayName
        } 
        if(person.emailAddresses && person.emailAddresses.length > 0){
            personFields.emailAddresses =person.emailAddresses[0].value
        }
        if(person.photos && person.photos.length > 0){
            personFields.photo =person.photos[0].url
        }
        if(person.phoneNumbers && person.phoneNumbers.length > 0){
            personFields.phoneNumber ={
                value: person.phoneNumbers[0].value,
                type: person.phoneNumbers[0].type
            }
        }
        data.push(personFields)
    });
    return data;
}

