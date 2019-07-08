from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from xlrd import open_workbook
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status
import json


DoorsKnocked_XLS_PATH = 'files/TotalDoors.xlsx'

class Members():

    def __init__(self, name, doors_knocked=0):
        self.name = name
        self.doors_knocked = doors_knocked

    # def __dict__(self):
    #     return 
def main(request):
    current_user = request.user
    if not current_user.is_authenticated:
        return render(request, 'login.html')

    # TODO: Initiate the Twitter initialization in the background.
    # Maybe use this: https://django-background-tasks.readthedocs.io/en/latest/

    # Then, show them the signup flow, including language selection.

    return render(request, 'main.html')

def home(request):
    read_xls()
    return render(request, 'home.html')

def read_xls():
    wb = open_workbook(DoorsKnocked_XLS_PATH)
    sheet = wb.sheet_by_index(0)
    MEMBERS = []
    number_of_rows = sheet.nrows
    number_of_columns = sheet.ncols
    for row in range(1, number_of_rows):
        values = []
        for col in range(number_of_columns):
            value = (sheet.cell(row, col).value)
            try:
                value = str(int(value))
            except ValueError:
                pass
            finally:
                if value == '' or value == ' ':
                    value = '-'
                values.append(value)
                # print("VALUES: {}".format(values))

        """
        In values list:

        0 - Member name
        1 - Doors knocked

        """
        name = values[0]
        doors_knocked = values[1]
        member = Members(name, int(doors_knocked))
        MEMBERS.append(member)

    return MEMBERS

def dump_members(members):
    ret = []
    for mem in members:
        # print("mem: {}".format(mem.__dict__))
        ret.append(mem.__dict__)
    return ret

class MembersAPI(APIView):
    def get(self, request):
        print("GET: {}".format(request))
        members = read_xls()
        print("members len: {}".format(len(members)))
        return Response(data=json.dumps(dump_members(members)), status=status.HTTP_200_OK)

    def post(self, request):
        ps = request.data.get("row")
        if re.search('[a-zA-Z]', ps):
            ps = 10
        request.session['page_size'] = ps
        return Response(status=status.HTTP_200_OK)