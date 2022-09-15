import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Button from "./components/Button";
import Day from "./components/Day";
import Header from "./components/Header";
import { height, width } from "./modules";
import chevronL from "./assets/chevronL.png";
import chevronR from "./assets/chevronR.png";

const DateRangePicker = ({
  moment,
  startDate,
  endDate,
  onChange,
  displayedDate,
  minDate,
  date,
  maxDate,
  range,
  dayHeaderTextStyle,
  dayHeaderStyle,
  backdropStyle,
  containerStyle,
  selectedStyle,
  selectedTextStyle,
  disabledStyle,
  dayStyle,
  dayTextStyle,
  disabledTextStyle,
  headerTextStyle,
  monthButtonsStyle,
  headerStyle,
  monthPrevButton,
  monthNextButton,
  children,
  buttonContainerStyle,
  buttonStyle,
  buttonTextStyle,
  presetButtons,
  open,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [weeks, setWeeks] = useState([]);
  const [selecting, setSelecting] = useState(false);
  const [dayHeaders, setDayHeaders] = useState([]);
  const _moment = moment;
  const mergedStyles = {
    backdrop: {
      ...styles.backdrop,
      ...backdropStyle,
    },
    container: {
      ...styles.container,
      ...containerStyle,
    },
    header: {
      ...styles.header,
      ...headerStyle,
    },
    headerText: {
      ...styles.headerText,
      ...headerTextStyle,
    },
    monthButtons: {
      ...styles.monthButtons,
      ...monthButtonsStyle,
    },
    buttonContainer: {
      ...styles.buttonContainer,
      ...buttonContainerStyle,
    },
  };

  const _onOpen = () => {
    if (typeof open !== "boolean") {
      onOpen();
    }
  };

  const _onClose = () => {
    if (typeof open !== "boolean") {
      onClose();
    }
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = useCallback(() => {
    setIsOpen(false);
    setSelecting(false);
    if (!endDate) {
      onChange({
        endDate: startDate,
      });
    }
  }, [endDate, startDate, onChange]);

  const previousMonth = () => {
    onChange({
      displayedDate: _moment(displayedDate).subtract(1, "months"),
    });
  };

  const nextMonth = () => {
    onChange({
      displayedDate: _moment(displayedDate).add(1, "months"),
    });
  };

  const selected = useCallback((_date, _startDate, _endDate, __date) => {
    return (
      (_startDate &&
        _endDate &&
        _date.isBetween(_startDate, _endDate, null, "[]")) ||
      (_startDate && _date.isSame(_startDate, "day")) ||
      (__date && _date.isSame(__date, "day"))
    );
  }, []);

  const disabled = useCallback((_date, _minDate, _maxDate) => {
    return (
      (_minDate && _date.isBefore(_minDate, "day")) ||
      (_maxDate && _date.isAfter(_maxDate, "day"))
    );
  }, []);

  const today = () => {
    if (range) {
      setSelecting(true);
      onChange({
        date: null,
        startDate: _moment(),
        endDate: _moment(),
        selecting: true,
        displayedDate: _moment(),
        label: "today",
      });
    } else {
      setSelecting(false);
      onChange({
        date: _moment(),
        startDate: null,
        endDate: null,
        displayedDate: _moment(),
        label: "today",
      });
    }
  };

  const yesterday = () => {
    if (range) {
      setSelecting(true);
      onChange({
        date: null,
        startDate: _moment().lastDay("yesterday"),
        endDate: _moment().lastDay("yesterday"),
        selecting: true,
        displayedDate: _moment().lastDay("yesterday"),
        label: "yesterday",
      });
    } else {
      setSelecting(false);
      onChange({
        date: _moment().lastDay("yesterday"),
        startDate: null,
        endDate: null,
        displayedDate: _moment().lastDay("yesterday"),
        label: "yesterday",
      });
    }
  };

  const thisWeek = () => {
    setSelecting(false);
    onChange({
      date: null,
      startDate: _moment().startOf("week"),
      endDate: _moment().endOf("week"),
      displayedDate: _moment(),
      label: "thisWeek",
    });
  };

  const last7Days = () => {
    setSelecting(false);
    onChange({
      date: null,
      startDate: _moment().startOf("last7Days"),
      endDate: _moment().endOf("last7Days"),
      displayedDate: _moment(),
      label: "last7Days",
    });
  };

  const thisMonth = () => {
    setSelecting(false);
    onChange({
      date: null,
      startDate: _moment().startOf("month"),
      endDate: _moment().endOf("month"),
      displayedDate: _moment(),
      label: "thisMonth",
    });
  };

  const thisQuarter = () => {
    setSelecting(false);
    onChange({
      date: null,
      startDate: _moment().startOf("thisQuarter"),
      endDate: _moment().endOf("thisQuarter"),
      displayedDate: _moment(),
      label: "thisQuarter",
    });
  };

  const thisYear = () => {
    setSelecting(false);
    onChange({
      date: null,
      startDate: _moment().startOf("thisYear"),
      endDate: _moment().endOf("thisYear"),
      displayedDate: _moment(),
      label: "thisYear",
    });
  };

  const select = useCallback(
    (day) => {
      let _date = _moment(displayedDate);
      _date.set("date", day);
      if (range) {
        if (selecting) {
          if (_date.isBefore(startDate, "day")) {
            setSelecting(true);
            onChange({
              startDate: _date,
              label: "custom",
            });
          } else {
            setSelecting(!selecting);
            onChange({
              endDate: _date,
              label: "custom",
            });
          }
        } else {
          setSelecting(!selecting);
          onChange({
            date: null,
            endDate: null,
            startDate: _date,
            label: "custom",
          });
        }
      } else {
        onChange({
          date: _date,
          startDate: null,
          endDate: null,
          label: "custom",
        });
      }
    },
    [_moment, displayedDate, onChange, range, selecting, startDate]
  );

  useEffect(() => {
    if (typeof open === "boolean") {
      if (open && !isOpen) {
        onOpen();
      } else if (!open && isOpen) {
        onClose();
      }
    }
  }, [open, isOpen, onClose]);

  useEffect(() => {
    function populateHeaders() {
      let _dayHeaders = [];
      for (let i = 0; i <= 6; ++i) {
        let day = _moment(displayedDate).weekday(i).format("EEEEEE");
        _dayHeaders.push(
          <Header
            key={`dayHeader-${i}`}
            day={day}
            index={i}
            dayHeaderTextStyle={dayHeaderTextStyle}
            dayHeaderStyle={dayHeaderStyle}
          />
        );
      }
      return _dayHeaders;
    }

    function populateWeeks() {
      let _weeks = [];
      let week = [];
      let daysInMonth = displayedDate.daysInMonth();
      let startOfMonth = _moment(displayedDate).set("date", 1);
      let offset = startOfMonth.weekday();
      week = week.concat(
        Array.from({ length: offset }, (x, i) => (
          <Day empty key={"empty-" + i} />
        ))
      );
      for (let i = 1; i <= daysInMonth; ++i) {
        let _date = _moment(displayedDate).set("date", i);
        let _selected = selected(_date, startDate, endDate, date);
        let _disabled = disabled(_date, minDate, maxDate);
        week.push(
          <Day
            key={`day-${i}`}
            selectedStyle={selectedStyle}
            selectedTextStyle={selectedTextStyle}
            disabledStyle={disabledStyle}
            dayStyle={dayStyle}
            dayTextStyle={dayTextStyle}
            disabledTextStyle={disabledTextStyle}
            index={i}
            selected={_selected}
            disabled={_disabled}
            select={select}
          />
        );
        if ((i + offset) % 7 === 0 || i === daysInMonth) {
          if (week.length < 7) {
            week = week.concat(
              Array.from({ length: 7 - week.length }, (x, index) => (
                <Day empty key={"empty-" + index} />
              ))
            );
          }
          _weeks.push(
            <View key={"weeks-" + i} style={styles.week}>
              {week}
            </View>
          );
          week = [];
        }
      }
      return _weeks;
    }

    function populate() {
      let _dayHeaders = populateHeaders();
      let _weeks = populateWeeks();
      setDayHeaders(_dayHeaders);
      setWeeks(_weeks);
    }

    populate();
  }, [
    startDate,
    endDate,
    date,
    _moment,
    displayedDate,
    dayHeaderTextStyle,
    dayHeaderStyle,
    selected,
    disabled,
    minDate,
    maxDate,
    selectedStyle,
    selectedTextStyle,
    disabledStyle,
    dayStyle,
    dayTextStyle,
    disabledTextStyle,
    select,
  ]);

  const node = (
    <View>
      <TouchableWithoutFeedback onPress={_onOpen}>
        {children ? (
          children
        ) : (
          <View>
            <Text>Click me to show date picker</Text>
          </View>
        )}
      </TouchableWithoutFeedback>
    </View>
  );

  return isOpen ? (
    <>
      <View style={mergedStyles.backdrop}>
        <TouchableWithoutFeedback
          style={styles.closeTrigger}
          onPress={_onClose}
        >
          <View style={styles.closeContainer} />
        </TouchableWithoutFeedback>
        <View>
          <View style={mergedStyles.container}>
            <View style={styles.header}>
              <TouchableOpacity onPress={previousMonth}>
                {monthPrevButton || (
                  <Image source={chevronL} style={mergedStyles.monthButtons} />
                )}
              </TouchableOpacity>
              <Text style={mergedStyles.headerText}>
                {displayedDate.format("MMMM") +
                  " " +
                  displayedDate.format("YYYY")}
              </Text>
              <TouchableOpacity onPress={nextMonth}>
                {monthNextButton || (
                  <Image
                    resizeMode="contain"
                    style={mergedStyles.monthButtons}
                    source={chevronR}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.calendar}>
              {dayHeaders && (
                <View style={styles.dayHeaderContainer}>{dayHeaders}</View>
              )}
              {weeks}
            </View>
            {presetButtons && (
              <>
                <View style={mergedStyles.buttonContainer}>
                  <Button
                    buttonStyle={buttonStyle}
                    buttonTextStyle={buttonTextStyle}
                    onPress={today}
                  >
                    Today
                  </Button>
                  <Button
                    buttonStyle={buttonStyle}
                    buttonTextStyle={buttonTextStyle}
                    onPress={yesterday}
                  >
                    Yesterday
                  </Button>
                  {range && (
                    <>
                      <Button
                        buttonStyle={buttonStyle}
                        buttonTextStyle={buttonTextStyle}
                        onPress={thisWeek}
                      >
                        This Week
                      </Button>
                      <Button
                        buttonStyle={buttonStyle}
                        buttonTextStyle={buttonTextStyle}
                        onPress={last7Days}
                      >
                        Last 7 days
                      </Button>
                    </>
                  )}
                </View>
                <View style={mergedStyles.buttonContainer}>
                  <Button
                    buttonStyle={buttonStyle}
                    buttonTextStyle={buttonTextStyle}
                    onPress={thisMonth}
                  >
                    This Month
                  </Button>
                  <Button
                    buttonStyle={buttonStyle}
                    buttonTextStyle={buttonTextStyle}
                    onPress={thisQuarter}
                  >
                    This Quarter
                  </Button>
                  <Button
                    buttonStyle={buttonStyle}
                    buttonTextStyle={buttonTextStyle}
                    onPress={thisYear}
                  >
                    This Year
                  </Button>
                </View>
              </>
            )}
          </View>
        </View>
      </View>
      {node}
    </>
  ) : (
    <>{node}</>
  );
};

export default DateRangePicker;

DateRangePicker.defaultProps = {
  dayHeaders: true,
  range: false,
  buttons: false,
  presetButtons: false,
};

DateRangePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  displayedDate: PropTypes.object,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  backdropStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  headerTextStyle: PropTypes.object,
  monthButtonsStyle: PropTypes.object,
  dayTextStyle: PropTypes.object,
  dayStyle: PropTypes.object,
  headerStyle: PropTypes.object,
  buttonTextStyle: PropTypes.object,
  buttonStyle: PropTypes.object,
  buttonContainerStyle: PropTypes.object,
  presetButtons: PropTypes.bool,
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0,0,0,0.6)",
    position: "absolute",
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2147483647,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    width: width * 0.87,
    paddingBottom: 8,
  },
  closeTrigger: {
    width: width,
    height: height,
  },
  closeContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  calendar: {
    paddingTop: 16,
    paddingBottom: 20,
    width: "100%",
    padding: 10,
  },
  headerText: {
    fontSize: 16,
    color: "black",
  },
  monthButtons: {
    resizeMode: "contain",
    width: 32,
    height: 32,
  },
  dayHeaderContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingBottom: 4,
  },
  week: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  buttonContainer: {
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
