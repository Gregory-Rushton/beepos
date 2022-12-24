import {useEffect, useState} from "react";
import {Ontology} from '../lib/ajax';

function Honey() {

    const [content, setContent] = useState('');

    useEffect(() => {
        const init = async () => {
            const response = await Ontology.autocomplete('cancer');
            setContent(response);
        };
        init();
    });

    return (
        <div>
            <h1>Honey</h1>
            <span>{content}</span>
        </div>
    );
}

export default Honey;
