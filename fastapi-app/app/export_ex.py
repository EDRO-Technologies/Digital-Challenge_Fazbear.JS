#-*- coding: utf-8 -*-
import os.path
import zipfile

from peewee import *
from pandas import *
from datetime import datetime, timedelta
from docx import Document
from reportlab.lib.pagesizes import *
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
from openpyxl import *
from reportlab.lib import colors




# Игнор ошибки стилей таблиц
import warnings
warnings.filterwarnings("ignore", category=UserWarning, module="docx")


def process_files(table_data: list):

    # Преобразование данных в DataFrame pandas
    data = {'Дата': [], 'Сообщения': [], 'Конец смены': [], 'Визы': [], 'Замечания': []}
    for row in table_data:
        data['Дата'].append(row['date'])
        data['Сообщения'].append(row['messages'])
        data['Конец смены'].append(row['shift_end'])
        data['Визы'].append(row['visas'])
        data['Замечания'].append(row['notes'])


    df = DataFrame(data)

    current_time = datetime.now().strftime("%Y_%m_%d_%H_%M_%S")

    excel_file_path = f'app/reports/Отчет_{current_time}.xlsx'

    df.to_excel(excel_file_path, index=False, engine='openpyxl')

    wb = load_workbook(excel_file_path)
    ws = wb.active

    for column in ws.columns:
        max_length = 0
        column = [cell for cell in column]
        for cell in column:
            try:
                if len(str(cell.value)) > max_length:
                    max_length = len(cell.value)
            except:
                pass
        adjusted_width = (max_length + 15)
        ws.column_dimensions[column[0].column_letter].width = adjusted_width

    wb.save(excel_file_path)


    # Сохранение данных в Word
    word_creation_time = current_time
    word_file_path = f'app/reports/Отчет_{word_creation_time}.docx'
    document = Document()

    table = document.add_table(rows=1, cols=len(df.columns))
    table.autofit = False

    table.style = 'TableGrid'

    for col_num, col_name in enumerate(df.columns):
        cell = table.cell(0, col_num)
        cell.text = col_name
        cell.paragraphs[0].runs[0].font.name = 'Cambria'
        cell.paragraphs[0].runs[0].font.bold = True


    for row_num, row_data in enumerate(df.itertuples(), start=1):
        table.add_row()
        for col_num, value in enumerate(row_data[1:], start=0):
            cell = table.cell(row_num, col_num)
            cell.text = str(value)


    document.save(word_file_path)

    doc = Document(word_file_path)

    pdf_file_path = f"app/reports/Отчет_{current_time}.pdf"
    styles = getSampleStyleSheet()  # дефолтовые стили
    # the magic is here
    styles['Normal'].fontName = 'DejaVuSerif'
    styles['Heading1'].fontName = 'DejaVuSerif'

    pdfmetrics.registerFont(TTFont('DejaVuSerif', 'DejaVuSerif.ttf', 'UTF-8'))
    pdf = SimpleDocTemplate(pdf_file_path, pagesize=A2)

    font_size = 10


    data = []
    for table in doc.tables:
        table_data = []
        for row in table.rows:
            row_data = [cell.text for cell in row.cells]
            table_data.append(row_data)
        data.extend(table_data)



    col_widths = [150, 300, 150, 200, 300]

    # Создание таблицы в ReportLab
    pdf_table = Table(data, colWidths=col_widths)


    style = TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.black),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, -1), 'DejaVuSerif'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 15),
        ('BACKGROUND', (0, 1), (-1, -1), colors.lightgrey),
        ('GRID', (0, 0), (-1, -1), 1, colors.black)
    ])

    pdf_table.setStyle(style)

    pdf_content = [pdf_table]

    pdf.build(pdf_content)

    pathes = [excel_file_path, word_file_path, pdf_file_path]

    zip_path = f"app/reports/Отчёт_{current_time}.zip"

    with zipfile.ZipFile(zip_path, mode="w") as archive:
        for path in pathes:
            archive.write(path, arcname=path[path.index("О"):])

    return os.path.abspath(zip_path)
