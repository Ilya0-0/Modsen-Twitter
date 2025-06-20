import styles from './styles.module.scss';

type SwitchProps = {
  isOn: boolean;
  onChange: (isOn: boolean) => void;
};

const Switch = ({ isOn, onChange }: SwitchProps) => {
  function handleToggle() {
    onChange(!isOn);
  }

  return (
    <label className={styles.switch}>
      <input type="checkbox" checked={isOn} onChange={handleToggle} />
      <span className={`${styles.slider} ${styles.round}`} />
    </label>
  );
};

export default Switch;
