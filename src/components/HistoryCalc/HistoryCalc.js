import React from 'react';
import styles from './HistoryCalc.module.scss';
import { evaluate } from 'mathjs';


const HistoryCalc = ({ historyList, toggleHistoryCalcHandler, setValueHandler, deleteHistoryHandler }) => {

    const onDeleteHistoryRow = (e, id) => {
        e.stopPropagation();
        console.log('HISTORY DELETED', e, id);
        deleteHistoryHandler(id)

    };

    const goToCalculator = (historyValue) => {
        historyValue = historyValue.split('=');
        historyValue.splice(1, historyValue.length - 1);
        const historyEvaluate = evaluate(historyValue);
        toggleHistoryCalcHandler()
        setValueHandler(historyEvaluate[0].toString());
    }

    return (
        <div className={styles.listHistory}>
            {historyList && historyList.length ?
                <>
                    {historyList.map(history => (
                        <div className={styles.rowHistory} key={history.id} onClick={() => goToCalculator(history.calc)}>
                            <button onClick={(e) => onDeleteHistoryRow(e, history.id)}>
                                <img src="https://img.icons8.com/android/14/000000/trash.png" alt="trash" />
                            </button>
                            <span>{history.calc}</span>
                        </div>
                    ))}
                </>
                : <div>There is no histories</div>
            }
        </div >
    )
}

export default HistoryCalc;
