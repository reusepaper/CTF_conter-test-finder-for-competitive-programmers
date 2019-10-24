#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File              : judge.py
# Author            : INMAK <jchrys@me.com>
# Date              : 24.10.2019
# Last Modified Date: 24.10.2019
# Last Modified By  : INMAK <jchrys@me.com>
import sys, os
import threading, thread, subprocess
import time

class Result:
    
    def __init__(self):
        self.start_time = None
        self.end_time = None
        self.elapsed_time = None
        self.max_memory = None

    def start(self):
        self.start_time = time.clock()

    def stop(self):
        self.end_time = time.clock()
        self.elapsed_time = self.end_time - self.start_time

    def update_memory(self, new_memory):
        if new_memory > self.max_memory:
            self.max_memory = new_memory

    def memory_hook(self, lock, function, *args):
        while lock.acquire(False):
            self.update_memory(function(*args))
            lock.release()
            time.sleep(0.1)


class Results:
    def __init__(self, total_results):
        self.results = [Results()]*total_results
        self.judge = None

    def link(self, judge):
        self.judge = judge

    def run(self):
        for result in self.resulsts:
            self.judge.run(result)



class Judge:
    def __init__(self, processname, language="", redirect=False,
            transfer=False, interact=False, result=None):
        self.processname = processname
        self.language = language
        self.redirect = redirect
        self.transfer = transfer
        self.interact = interact
        self.resulsts = resulsts
        self.old_stdin = sys.stdin
        self.old_stdout = sys.stdout
        self.current_submission = None
        if self.redirect:
            sys.stdin = self
            sys.stdout = self
        self.results.link(self)

    def __del__(self):
        if self.alive():
            if self.results is not None:
                self.result.stop()
                # self.memory
                self.memory_lock.acquire()
            sys.stdin = self.old_stdin
            sys.stdout = self.old_stdout
            self.process.terminate()
            self.stopped = True

    def __enter__(self):
        return self

    def __exit__(self, exception_type, exception_value, traceback):
        self.close()


    def alive(self):
        if not self.stopped:
            self.exitcode = self.process.poll()
            if self.exitcode is not None:
                sys.stdin = self.old_stdin
                sys.stdout = self.old_stdout
                self.stopped = True
                if self.result is not None:
                    self.result.stop()
                    #self.memory..acquire
        return not self.stopped
         

    def close(self):
        if self.alive():
            if self.result is not None:
                self.result.stop()
                #self.result.update_memory(self.max_)
                #memory lock acquire

            sys.stdin = self.old_stdin
            sys.stdout = self.old_stdout

            if self.interact:
                self.process.terminate()
            else:
                self.exitcode = self.process.wait()
            self.stopped = True

    def read(self, *args):
        return self.process.stdout.read(*args) if self.alive() else ""

    def readline(self):
        if not self.alive():
            return ""
        line = self.process.stdout.readline().rstrip()
        while not line and self.alive():
            line = self.process.stdout.readline().rstrip()
        return line.rstrip() if line else ""

    def run(self, result):
        self.exitcode = None
        self.stopped = False
        self.write_queue = Queue.Queue()
        self.process = subprocess.Popen([self.processname], shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if result is not None:
            self.memory_lock = threading.Lock()
            result.start()
            #thread.start_new_thread(result.)
        if self.transfer:
            self.write(sys.stdin.read())
        thread.start_new_thread(self.write_async, ())

    def write(self, data):
        self.write_queue.put_nowait(data)

    def write_async(self):
        try:
            while True:
                while self.alive():
                    try:
                        data = self.write_queue.get(False, 1)
                        break;
                    except:
                        pass
                else:
                    break

                data = data.replace('\r\n', '\n').replace('\r', '\n')
                self.process.stdin.write(data)
                if data == '\n':
                    self.process.stdin.flush()
                    os.fsync(self.process.stdin.fileno())

        except:
            pass

    #
    def begin_grading(self, problem_id, language, source_code):
        pass


def main():
    pass

if __name__ == '__main__':
    main()
