TODO: There are performance tests written with k6 that are used for (1) measuring the performance of loading the assignment page and (2) measuring the performance of submitting assignments. The test results are outlined in the PERFORMANCE_TEST_RESULTS.md that is included in the assignment template.

(1)


     data_received..................: 103 MB 21 MB/s
     data_sent......................: 482 kB 96 kB/s
     http_req_blocked...............: avg=27.88µs  med=0s     p(99)=515.47µs
     http_req_connecting............: avg=2.09µs   med=0s     p(99)=0s
     http_req_duration..............: avg=8.1ms    med=3.92ms p(99)=9.46ms
       { expected_response:true }...: avg=8.1ms    med=3.92ms p(99)=9.46ms
     http_req_failed................: 0.00%  ✓ 0           ✗ 6027
     http_req_receiving.............: avg=156.58µs med=0s     p(99)=678.42µs
     http_req_sending...............: avg=30.23µs  med=0s     p(99)=555.27µs
     http_req_tls_handshaking.......: avg=0s       med=0s     p(99)=0s
     http_req_waiting...............: avg=7.91ms   med=3.62ms p(99)=9.36ms
     http_reqs......................: 6027   1204.790087/s
     iteration_duration.............: avg=8.26ms   med=3.99ms p(99)=9.52ms
     iterations.....................: 6027   1204.790087/s
     vus............................: 10     min=10        max=10
     vus_max........................: 10     min=10        max=10


running (05.0s), 00/10 VUs, 6027 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  5s


(2)
  scenarios: (100.00%) 1 scenario, 10 max VUs, 35s max duration (incl. graceful stop):
           * default: 10 looping VUs for 5s (gracefulStop: 30s)


     data_received..................: 33 kB 4.7 kB/s
     data_sent......................: 43 kB 6.1 kB/s
     http_req_blocked...............: avg=826.19µs med=0s      p(99)=12.61ms
     http_req_connecting............: avg=97.92µs  med=0s      p(99)=1.5ms
     http_req_duration..............: avg=449.19ms med=49.04ms p(99)=4.85s
       { expected_response:true }...: avg=449.19ms med=49.04ms p(99)=4.85s
     http_req_failed................: 0.00% ✓ 0         ✗ 154
     http_req_receiving.............: avg=139.21µs med=0s      p(99)=691.12µs
     http_req_sending...............: avg=44.84µs  med=0s      p(99)=572.91µs
     http_req_tls_handshaking.......: avg=0s       med=0s      p(99)=0s
     http_req_waiting...............: avg=449ms    med=49.04ms p(99)=4.85s
     http_reqs......................: 154   22.130908/s
     iteration_duration.............: avg=450.19ms med=49.04ms p(99)=4.85s
     iterations.....................: 154   22.130908/s
     vus............................: 10    min=10      max=10
     vus_max........................: 10    min=10      max=10

                                                                                                                                           
running (07.0s), 00/10 VUs, 154 complete and 0 interrupted iterations                                                                      
default ✓ [======================================] 10 VUs  5s                                                                              
