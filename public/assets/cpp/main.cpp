#include <iostream>

extern "C" {
    void run() {
        std::cout << "Hello from C++ WASM!" << std::endl;
    }
}
