from export_ex import db, Users


db.init('example.db', host='localhost', user='postgres')
# Подключение к базе данных
db.connect()

# Создание таблицы (если она не существует)
db.create_tables([Users], safe=True)

# Закрытие соединения
db.close()

print("Database and tables created successfully.")