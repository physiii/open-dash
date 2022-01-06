#
# This is a project Makefile. It is assumed the directory this Makefile resides in is a
# project subdirectory.
#

PROJECT_NAME := myhw

include $(IDF_PATH)/make/project.mk

debug: CFLAGS += -D_DEBUG
debug:
	touch components/main/can_capture.c
	make -j8 app flash monitor

verbose: CFLAGS += -D_DEBUG -D_VERBOSE
verbose: debug

