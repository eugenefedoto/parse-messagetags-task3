function parse(message){
    const tags = message.substr(1).split(';'); // remove @ before getting tags
    
    // <tag>    ::= <key> ['=' <escaped value>]
    // <key>    ::= [ <vendor> '/' ] <sequence of letters, digits, hyphens (`-`)>

    let tagsKVStore = []; 
    for (let i = 0; i < tags.length; i++) {
        let tempArray = tags[i].split('=');
        let vendor = '';

        // separate <vendor> from tag
        if(tempArray[0].includes('/')){
            const tempSplitVendor = tempArray[0].split('/')
            vendor = tempSplitVendor[0];
            tempArray[0] = tempSplitVendor[1];
        }

        // we don't want undefined keys
        if(tempArray[1] === undefined){
            tempArray[1] = '';
        }

        tagsKVStore.push({
            vendor,
            key: tempArray[0],
            value: convertEscaped(tempArray[1])
        })
    }
    console.log(tagsKVStore)
    
    return tagsKVStore;
}

function convertEscaped(escapedSequence){
    const cleanedSequence = escapedSequence.replace(/\:/g, ";").replace(/\\s/g, " ")
    .replace(/\\\\/g, "\\").replace(/\\r/g, "\r").replace(/\\n/g, "\n");

    return cleanedSequence;
}

// test cases
//parse('@aaa=bbb;x=y;ccc;www;example.com/ddd=eee');
//parse('@aaa=\rbb\nb;\\\\ccc;ffff=\:;example.com/ddd=\\se');