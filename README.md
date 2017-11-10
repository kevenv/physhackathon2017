# physhackathon2017
SimWave is a web application built for simulating the propogation of physical waves from multiple sources.
# Can be viewed at 
https://kevenv.github.io/physhackathon2017/main.html
## Dependencies
All required javascript libraries are included in the [libs](https://github.com/kevenv/physhackathon2017/tree/master/libs) folder.
## Parameters
For our wave simulator, there are multiple parameters which users could modify in read-time simulation.
</br>
<img src="https://github.com/kevenv/physhackathon2017/blob/master/controlPanel.jpg" width="300px">
### Wave parameters 
1. alptitude: the apltitude of source wave.
2. frequency: the frequncy of the source wave.
3. WaveSpeed: speed of the wave.
4. DampingSpeed: damping coefficient.
5. dt: the delta time of each computing step.
### Plot parameters
1. color_peak: color of peak points.
2. color_bot: color of bottom points.
### Source parameters
1. x,y: coordinates of the sound source in (x, y) plane.
2. phase: the initial phase of the source.
3. vx,vy: velocity of sound source in (x,y) plane. 
## Extra Features
1. Freeze: stop all updates on the frame and user can look at static points
2. switch_Algorithm: switch between mathematical representation and physical representation 
3. View Source : see the source code
4. addSource: add additional source, corresponding controls for the newly added source is also dynamically added
5. Reset_Sources: Reset number of sources to 2 and to initial state
6. Sound compression: simulate sound interation in 2d space
