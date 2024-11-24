import { Component, OnInit } from '@angular/core';

interface Day {
  date: number | null; // Null для порожніх місць перед першим днем
  color: string; // 'green', 'red', або ''
}

interface Habit {
  name: string;
  days: Day[]; // Масив об'єктів Day
  editing: boolean;
}

@Component({
  selector: 'app-habits',
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.scss'],
})
export class HabitsComponent implements OnInit {
  habits: Habit[] = [];
  weekdays: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд']; // Дні тижня, починаючи з понеділка

  ngOnInit(): void {
    this.habits = [
      {
        name: 'Тренування',
        days: this.generateDaysForCurrentMonth(),
        editing: false,
      },
      {
        name: 'Медитація',
        days: this.generateDaysForCurrentMonth(),
        editing: false,
      },
    ];
  }

  // Генерація масиву днів для поточного місяця
  generateDaysForCurrentMonth(): Day[] {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // Поточний місяць (індекс з 0)
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Кількість днів у місяці
    const firstDay = new Date(year, month, 1).getDay(); // Перший день місяця (0 = неділя, 1 = понеділок тощо)
    const adjustedFirstDay = (firstDay + 6) % 7; // Корекція, щоб понеділок був першим днем

    const days: Day[] = [];

    // Додаємо порожні місця перед першим днем місяця
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push({ date: null, color: '' });
    }

    // Додаємо дні місяця
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: i, color: '' });
    }

    return days;
  }

  addHabit() {
    const newHabit: Habit = {
      name: '',
      days: this.generateDaysForCurrentMonth(),
      editing: true,
    };
    this.habits.push(newHabit);
  }

  deleteHabit(habit: Habit) {
    this.habits = this.habits.filter(h => h !== habit);
  }

  editHabitName(habit: Habit) {
    habit.editing = true;
  }

  saveHabitName(habit: Habit) {
    if (habit.name.trim() === '') {
      alert('Назва звички не може бути порожньою!');
    } else {
      habit.editing = false;
    }
  }

  toggleDay(habit: Habit, date: number | null) {
    if (date === null) return; // Пропустити, якщо це порожнє місце
    const day = habit.days.find(d => d.date === date);
    if (!day) return;

    if (day.color === '') {
      day.color = 'green';
    } else if (day.color === 'green') {
      day.color = 'red';
    } else {
      day.color = '';
    }
  }
}
