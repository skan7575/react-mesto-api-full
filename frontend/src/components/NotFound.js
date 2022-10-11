import {useHistory} from "react-router-dom";

function NotFound() {
    const history = useHistory()
    const handleSubmit = (e) => {
        e.preventDefault();
        history.push('/')
    }

    return(
        <div className='not-found'>
             <h1 className='not-found__title'>Упс... такой странички нет:)</h1>
            <button onClick={handleSubmit} className='not-found__button'>
                На главную!
            </button>
        </div>
    )
}
export default NotFound