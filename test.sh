#!/bin/bash

curl -X POST -L \
    -H "Authorization: Bearer ya29.a0ARrdaM8-AfmuJ0ji7CJbYd10tJQiVMp7qxwuR4blwh_FjL_HgREHt88qP91b6NbMWjnA0_31qM4ZV4hWUZsvLsGSTVXZxQ3GABBgvzyHda7NlGxgKBH5l4tMbJC-gFh8P1uBNXwf0xNXxgATDGaLvFjTPT6N" \
    -F "metadata={name : '$1'};type=application/json;charset=UTF-8" \
    -F "file=@$1;type=application/zip" \
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart"

	