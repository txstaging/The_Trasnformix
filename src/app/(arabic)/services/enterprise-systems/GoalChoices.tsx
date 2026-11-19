"use client";

import { useState } from "react";
import styles from "./page.module.css";

const goals = [
  "دقة المخزون",
  "سرعة الإقفال المالي",
  "تحسين التقارير",
  "توحيد البيانات",
  "الرقابة على الموافقات",
  "هدف آخر",
];

export function GoalChoices() {
  const [selected, setSelected] = useState<string[]>([]);

  function toggleGoal(goal: string) {
    setSelected((current) =>
      current.includes(goal)
        ? current.filter((item) => item !== goal)
        : current.length < 3
          ? [...current, goal]
          : current,
    );
  }

  return (
    <fieldset className={styles.fullField}>
      <legend>ما أهداف المشروع الثلاثة الأكثر أهمية؟ <span>*</span></legend>
      <small aria-live="polite">اختر حتى ثلاثة أهداف ({selected.length} من 3).</small>
      <div className={styles.choiceList}>
        {goals.map((goal) => {
          const checked = selected.includes(goal);
          const disabled = selected.length === 3 && !checked;
          return (
            <label className={styles.choice} key={goal}>
              <input
                type="checkbox"
                name="goals"
                value={goal}
                checked={checked}
                disabled={disabled}
                onChange={() => toggleGoal(goal)}
              />
              <span>{goal}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
